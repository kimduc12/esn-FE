import { Paper, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import userApi from 'api/userApi';
import React from 'react';
import { useHistory } from 'react-router';
import RegisterForm from '../components/RegisterForm';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { toast } from 'react-toastify';

const useStyles = makeStyles((theme) => ({
    root: {},
    wrapper: {
        padding: theme.spacing(4),
        width: '30vw',
    },
    heading: {
        textAlign: 'center',
        textTransform: 'uppercase',
    },
    back: {
        marginTop: theme.spacing(2),
        textAlign: 'center',
        '& > a': {
            color: theme.palette.grey[600],
            textDecoration: 'none',
            '& > svg': {
                verticalAlign: 'middle',
            },
        },
    },
}));

function RegisterPage() {
    const classes = useStyles();
    const history = useHistory();
    const handleLoginSubmit = async (formValues) => {
        const res = await userApi.register(formValues);
        if (res.status) {
            toast.success(res.message);
            history.push('/login');
        } else {
            toast.error(res.message);
        }
    };
    return (
        <Box className={classes.root}>
            <Paper elevation={2} className={classes.wrapper}>
                <Typography component="h2" variant="h5" className={classes.heading}>
                    Register
                </Typography>
                <RegisterForm onSubmit={handleLoginSubmit} />
                <Box className={classes.back}>
                    <Link to="/login">
                        <ArrowBackIcon size="small" /> Back to login
                    </Link>
                </Box>
            </Paper>
        </Box>
    );
}

export default RegisterPage;
