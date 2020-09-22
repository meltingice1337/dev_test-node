import React, { FunctionComponent, lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';

import { useAuthContext } from '@contexts/AuthenticationContext';

const AuthenticationLayout = lazy((): Promise<{ default: FunctionComponent }> => import('@pages/authentication/AuthenticationLayout'));
const DashboardLayout = lazy((): Promise<{ default: FunctionComponent }> => import('@pages/dashboard/DashboardLayout'));

import { Spinner } from '@components/spinner/Spinner';

const App: FunctionComponent = () => {
    const { authUser } = useAuthContext();

    const renderLayout = (comp: FunctionComponent): JSX.Element => {
        return <Route path="/" component={comp} />
    }

    return (
        <Suspense fallback={<Spinner />}>
            <Switch>
                {authUser ? renderLayout(DashboardLayout) : renderLayout(AuthenticationLayout)}
            </Switch>
        </Suspense>
    )
}

export default App;