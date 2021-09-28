import { Grid, Paper } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import userApi from 'api/userApi';
import classNames from 'classnames';
import React from 'react';
import { toast } from 'react-toastify';
import AccountChangePasswordForm from './AccountChangePasswordForm';

const useStyles = makeStyles((theme) => ({
    root: {
        position: 'relative',
    },
    loading: {
        position: 'absolute',
        top: '-10px',
        width: '100%',
    },
    paper: {
        padding: theme.spacing(3),
    },
}));

function AccountChangePasswordTab() {
    const classes = useStyles();
    const [loading, setLoading] = React.useState(false);
    const [data, setData] = React.useState({
        id: 0,
        old_password: '',
        password: '',
        password_confirmation: '',
    });

    React.useEffect(() => {
        (async () => {
            setLoading(true);
            const res = await userApi.getUserInfo();
            if (res.status) {
                const dt = res.data;
                setData({
                    id: dt.id,
                    name: dt.name,
                    email: dt.email,
                });
            }
            setLoading(false);
        })();
    }, []);

    const handleUpdateProfile = async (formValues) => {
        setLoading(true);
        const res = await userApi.update(data.id, formValues);
        if (res.status) {
            toast.success(res.message);
        } else {
            toast.error(res.message);
        }
        setLoading(false);
    };

    return (
        <Box className={classes.root}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                    <Paper elevation={1} className={classNames(classes.paper)}>
                        {!loading && (
                            <AccountChangePasswordForm data={data} onSubmit={handleUpdateProfile} />
                        )}
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
}

export default AccountChangePasswordTab;
