import React from 'react';
import { Switch, Route } from 'react-router';
import AdminUserAddEditPage from './Pages/UserAddEditPage';
import AdminUserListPage from './Pages/UserListPage';

function AdminUsersFeature() {
    return (
        <Switch>
            <Route exact path="/admin/users" component={AdminUserListPage} />
            <Route exact path="/admin/users/add" component={AdminUserAddEditPage} />
            <Route exact path="/admin/users/:id" component={AdminUserAddEditPage} />
        </Switch>
    );
}

export default AdminUsersFeature;
