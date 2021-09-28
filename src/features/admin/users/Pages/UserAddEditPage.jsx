import { LinearProgress, Paper, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import userApi from 'api/userApi';
import React from 'react';
import { useHistory, useParams } from 'react-router';
import { toast } from 'react-toastify';
import UserForm from '../Components/UserForm';

const useStyles = makeStyles((theme) => ({
    root: {
        position: 'relative',
    },
    loading: {
        position: 'absolute',
        top: '-10px',
        width: '100%',
    },
    heading: {
        marginBottom: theme.spacing(2),
        display: 'flex',
        flexFlow: 'row nowrap',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    paper: {
        padding: theme.spacing(2),
    },
}));

function AdminUserAddEditPage() {
    const classes = useStyles();
    const history = useHistory();
    const [loading, setLoading] = React.useState(false);
    const { id } = useParams();
    const isEdit = Boolean(id);
    const [user, setUser] = React.useState();

    React.useEffect(() => {
        if (!id) return;
        (async () => {
            setLoading(true);
            try {
                const res = await userApi.get(id);
                if (res.status) {
                    setUser({
                        name: res.data.name,
                        username: res.data.username ?? '',
                        password: '',
                        email: res.data.email,
                        phone: res.data.phone,
                        gender: String(res.data.gender),
                        birthday: res.data.birthday,
                        role_id: res.data.roles[0].id,
                    });
                } else {
                    toast.error(res.message);
                    history.push('/users');
                }
            } catch (error) {
                console.log('get user by id error', error.message);
            }
            setLoading(false);
        })();
    }, [id, history]);

    const initialValue = {
        name: '',
        username: '',
        password: null,
        email: '',
        phone: '',
        gender: '0',
        birthday: '',
        role_id: '',
        ...user,
    };

    const handleFormSubmit = async (formValues) => {
        console.log('handleFormSubmit', formValues);
        setLoading(true);
        try {
            let res;
            if (isEdit) {
                res = await userApi.update(id, formValues);
            } else {
                res = await userApi.add(formValues);
            }
            if (res.status) {
                toast.success(res.message);
                history.push('/admin/users');
            } else {
                toast.error(res.message);
            }
        } catch (error) {
            console.log('Error', error.message);
        }
        setLoading(false);
    };

    return (
        <Box className={classes.root}>
            {loading && (
                <Box className={classes.loading}>
                    <LinearProgress />
                </Box>
            )}

            <Box className={classes.heading}>
                <Typography component="h1" variant="h5">
                    {isEdit ? `Edit user` : `Add new user`}
                </Typography>
            </Box>

            <Paper elevation={3} className={classes.paper}>
                {(!isEdit || Boolean(user)) && !loading && (
                    <UserForm initialValue={initialValue} onSubmit={handleFormSubmit} />
                )}
            </Paper>
        </Box>
    );
}

export default AdminUserAddEditPage;
