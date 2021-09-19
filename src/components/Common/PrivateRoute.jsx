import React from 'react';
import { Redirect, Route } from 'react-router';
import { getLSItem } from 'utils';

export function PrivateRoute(props) {
    const isLoggedIn = Boolean(getLSItem('access_token'));
    console.log('isLoggedIn', isLoggedIn);
    if (!isLoggedIn) return <Redirect to="/login" />;

    return <Route {...props} />;
}
