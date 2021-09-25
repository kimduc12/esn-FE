import React from 'react';
import { Route, Switch } from 'react-router';
import AdminAccountFeature from './account';
import AdminDashboardFeature from './dashboard';
import AdminUsersFeature from './users';

function AdminFeature() {
    return (
        <Switch>
            <Route exact path="/admin" component={AdminDashboardFeature} />
            <Route path="/admin/account" component={AdminAccountFeature} />
            <Route path="/admin/users" component={AdminUsersFeature} />
        </Switch>
    );
}

export default AdminFeature;
