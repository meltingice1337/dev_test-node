import React, { FunctionComponent } from 'react';
import { RouteRenderer } from '@components/route-renderer/RouteRenderer';

import { routes } from '@routes/authentication.routes';

const AuthenticationLayout: FunctionComponent = () => {
    return <RouteRenderer routes={routes} />;
}

export default AuthenticationLayout;