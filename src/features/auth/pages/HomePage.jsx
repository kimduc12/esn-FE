import React from 'react';
import { Redirect } from 'react-router';
import { getLSItem } from 'utils';

function HomePage() {
    const isLoggedIn = Boolean(getLSItem('access_token'));
    if (!isLoggedIn) {
        return <Redirect to="/login" />;
    } else {
        return <Redirect to="/admin" />;
    }
}

export default HomePage;
