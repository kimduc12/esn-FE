import { Paper, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import userApi from 'api/userApi';
import React from 'react';
import { useHistory } from 'react-router';
import RegisterForm from '../components/RegisterForm';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexFlow: 'row nowrap',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: theme.palette.primary.light,
    },
    wrapper: {
        padding: theme.spacing(2),
        width: '30vw',
    },
    heading: {
        textAlign: 'center',
        textTransform: 'uppercase',
    },
}));

function RegisterPage() {
    const classes = useStyles();
    const history = useHistory();
    const handleLoginSubmit = async (formValues) => {
        console.log('formValues', formValues);
        const res = await userApi.register(formValues);
        if (res.status) {
            history.push('/login');
        }
    };
    return (
        <Box className={classes.root}>
            <Paper elevation={2} className={classes.wrapper}>
                <Typography component="h1" variant="h4" className={classes.heading}>
                    Register
                </Typography>
                <RegisterForm onSubmit={handleLoginSubmit} />
            </Paper>
        </Box>
    );
}

export default RegisterPage;
