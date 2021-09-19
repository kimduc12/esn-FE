import { NotFound } from 'components/Common';
import { PrivateRoute } from 'components/Common';
import { AdminLayout } from 'components/Layout';
import AuthFeature from 'features/auth';
import React from 'react';
import { Route, Switch } from 'react-router';

function App() {
    return (
        <Switch>
            <PrivateRoute path="/admin">
                <AdminLayout />
            </PrivateRoute>
            <Route path="/" component={AuthFeature} />
            <Route>
                <NotFound />
            </Route>
        </Switch>
    );
}

export default App;
