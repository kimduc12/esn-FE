import React from 'react';
import { Route, Switch } from 'react-router';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';

function AuthFeature() {
    return (
        <Switch>
            <Route path="/" component={HomePage} exact />
            <Route path="/login" component={LoginPage} />
            <Route path="/forgot-password" component={ForgotPasswordPage} />
            <Route path="/reset-password" component={LoginPage} />
        </Switch>
    );
}

export default AuthFeature;
