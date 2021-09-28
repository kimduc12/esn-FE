import { AdminNotFound } from 'components/Common';
import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router';
import AdminAccountFeature from './account';
import AdminDashboardFeature from './dashboard';
import AdminUsersFeature from './users';

function AdminFeature() {
    const match = useRouteMatch();
    return (
        <Switch>
            <Route exact path={`${match.url}`} component={AdminDashboardFeature} />
            <Route path={`${match.url}/account`} component={AdminAccountFeature} />
            <Route path={`${match.url}/users`} component={AdminUsersFeature} />
            <Route>
                <AdminNotFound />
            </Route>
        </Switch>
    );
}

export default AdminFeature;
