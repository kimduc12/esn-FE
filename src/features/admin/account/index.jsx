import { AdminNotFound } from 'components/Common/AdminNotFound';
import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router';
import AccountProfilePage from './Pages/AccountProfilePage';

function AdminAccountFeature() {
    const match = useRouteMatch();
    return (
        <Switch>
            <Route exact path={`${match.url}`} component={AccountProfilePage} />
            <Route>
                <AdminNotFound />
            </Route>
        </Switch>
    );
}

export default AdminAccountFeature;
