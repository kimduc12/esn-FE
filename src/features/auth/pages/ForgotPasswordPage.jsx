import { Paper, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import React from 'react';
import ForgotPasswordForm from '../components/ForgotPasswordForm';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexFlow: 'row nowrap',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: theme.palette.primary.light,
    },
    loginWrapper: {
        padding: theme.spacing(2),
    },
    loginHeading: {
        textAlign: 'center',
        textTransform: 'uppercase',
    },
}));

function ForgotPasswordPage() {
    const classes = useStyles();
    return (
        <Box className={classes.root}>
            <Paper elevation={2} className={classes.loginWrapper}>
                <Typography component="h1" variant="h4" className={classes.loginHeading}>
                    Forgot password
                </Typography>
                <ForgotPasswordForm />
            </Paper>
        </Box>
    );
}

export default ForgotPasswordPage;
