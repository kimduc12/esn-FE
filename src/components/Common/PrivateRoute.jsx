import userApi from 'api/userApi';
import { authActions, selectCurrentUser } from 'features/auth/authSlice';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, useHistory } from 'react-router';
import { getLSItem, setLSItem } from 'utils';
import { LoadingOverlay } from './LoadingOverlay';

export function PrivateRoute(props) {
    const [loading, setLoading] = useState(true);
    const history = useHistory();
    const dispatch = useDispatch();
    const selectUser = useSelector(selectCurrentUser);

    useEffect(() => {
        (async () => {
            const accessToken = getLSItem('access_token');
            const isLoggedIn = Boolean(accessToken);
            if (!isLoggedIn) history.push('/login');
            if (!selectUser) {
                const res = await userApi.getUserInfo();
                if (res.status) {
                    setLSItem('access_token', res.data.accessToken);
                    delete res.data.accessToken;
                    dispatch(authActions.setRoles(res.data.roles));
                    delete res.data.roles;
                    dispatch(authActions.setCurrentUser(res.data));
                    setLoading(false);
                } else {
                    setLoading(false);
                    history.push('/login');
                }
            }
        })();
    }, [history, selectUser, dispatch]);

    if (loading) return <LoadingOverlay />;
    return <Route {...props} />;
}
