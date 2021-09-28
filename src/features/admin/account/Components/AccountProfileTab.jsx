import { Grid, LinearProgress, Paper } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import fileApi from 'api/fileApi';
import userApi from 'api/userApi';
import classNames from 'classnames';
import { AvatarField } from 'components/FormFields';
import { APP_URL } from 'config';
import React from 'react';
import { toast } from 'react-toastify';
import AccountProfileForm from './AccountProfileForm';

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
    avatarPaper: {
        padding: theme.spacing(10, 2),
        textAlign: 'center',
    },
}));

function AccountProfileTab() {
    const classes = useStyles();
    const [loading, setLoading] = React.useState(false);
    const [avatarUrl, setAvatarUrl] = React.useState(
        'http://apitest.childrensalon.vn/storage/product/2021/02/09/blob-14877-1612877181.jpg'
    );
    const [data, setData] = React.useState({
        id: 0,
        name: '',
        username: '',
        email: '',
        phone: '',
        gender: '',
        birthday: '',
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
                    username: dt.username,
                    email: dt.email,
                    phone: dt.phone,
                    gender: String(dt.gender),
                    birthday: dt.birthday,
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
            formValues.gender = String(formValues.gender);
            setData(formValues);
        } else {
            toast.error(res.message);
        }
        setLoading(false);
    };

    const handleUpdateAvatar = async (file) => {
        setLoading(true);
        const formData = new FormData();
        formData.append('module', 'gift');
        formData.append('file', file);
        const res = await fileApi.upload(formData);
        if (res.status) {
            setAvatarUrl(APP_URL + res.data.file_path);
        } else {
            toast.error(res.message);
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
            <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                    <Paper elevation={1} className={classNames(classes.paper, classes.avatarPaper)}>
                        {!loading && <AvatarField onChange={handleUpdateAvatar} src={avatarUrl} />}
                    </Paper>
                </Grid>
                <Grid item xs={12} md={8}>
                    <Paper elevation={1} className={classes.paper}>
                        {!loading && (
                            <AccountProfileForm data={data} onSubmit={handleUpdateProfile} />
                        )}
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
}

export default AccountProfileTab;
