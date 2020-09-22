import React, { FunctionComponent } from 'react';
import { RouteRenderer } from '@components/route-renderer/RouteRenderer';

import { routes } from '@routes/authentication.routes';

const AuthenticationLayout: FunctionComponent = () => {
    return (
        <div className="auth-wrapper">
            <div className="auth-inner">
                <RouteRenderer routes={routes} />
            </div>
        </div>
    );
}

export default AuthenticationLayout;