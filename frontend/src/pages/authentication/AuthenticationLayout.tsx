import React, { FunctionComponent, useLayoutEffect } from 'react';
import { matchPath } from 'react-router';
import { useHistory, useLocation } from 'react-router-dom';
import { RouteRenderer } from '@components/route-renderer/RouteRenderer';

import { routes } from '@routes/authentication.routes';

const AuthenticationLayout: FunctionComponent = () => {
    const location = useLocation();
    const history = useHistory();

    useLayoutEffect(() => {
        const exists = routes.find(r => matchPath(location.pathname, { path: r.path }));
        if (!exists) {
            history.push('/signin')
        }
    }, [location])

    return (
        <div className="auth-wrapper">
            <div className="auth-inner">
                <RouteRenderer routes={routes} />
            </div>
        </div>
    );
}

export default AuthenticationLayout;