import { Paper, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import React from 'react';
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
    return (
        <Box className={classes.root}>
            <Paper elevation={2} className={classes.wrapper}>
                <Typography component="h1" variant="h4" className={classes.heading}>
                    Register
                </Typography>
                <RegisterForm />
            </Paper>
        </Box>
    );
}

export default RegisterPage;
