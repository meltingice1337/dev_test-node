import React, { FunctionComponent, useLayoutEffect } from 'react';
import { RouteRenderer } from '@components/route-renderer/RouteRenderer';

import { routes } from '@routes/authentication.routes';

const AuthenticationLayout: FunctionComponent = () => {
    return (
        <div className="auth-wrapper">
            <div className="auth-inner">
                <RouteRenderer routes={routes} defaultRoute="/signin" />
            </div>
        </div>
    );
}

export default AuthenticationLayout;