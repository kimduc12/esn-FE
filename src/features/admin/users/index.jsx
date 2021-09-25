import React from 'react';
import { Switch, Route } from 'react-router';
import AdminUserAddPage from './Pages/UserAddPage';
import AdminUserListPage from './Pages/UserListPage';

function AdminUsersFeature() {
    return (
        <Switch>
            <Route exact path="/admin/users" component={AdminUserListPage} />
            <Route exact path="/admin/users/add" component={AdminUserAddPage} />
        </Switch>
    );
}

export default AdminUsersFeature;
