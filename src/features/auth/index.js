import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { Route, Switch } from 'react-router';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import { makeStyles } from '@mui/styles';
import ResetPasswordPage from './pages/ResetPasswordPage';
import { NotFound } from 'components/Common/NotFound';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexFlow: 'column nowrap',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: theme.palette.primary.light,
    },
    heading: {
        textAlign: 'center',
        textTransform: 'uppercase',
        marginBottom: theme.spacing(3),
        color: '#fff',
    },
}));

function AuthFeature() {
    const classes = useStyles();
    return (
        <Box className={classes.root}>
            <Box className={classes.heading}>
                <Typography component="h1" variant="h4">
                    <ShoppingCartRoundedIcon size="large" />
                    &nbsp;ESN Network
                </Typography>
            </Box>
            <Switch>
                <Route path="/" component={HomePage} exact />
                <Route path="/login" component={LoginPage} />
                <Route path="/forgot-password" component={ForgotPasswordPage} />
                <Route path="/reset-password" component={ResetPasswordPage} />
                <Route path="/reset-password" component={LoginPage} />
                <Route path="/register" component={RegisterPage} />
                <Route>
                    <NotFound />
                </Route>
            </Switch>
        </Box>
    );
}

export default AuthFeature;
