import React, { FunctionComponent } from 'react';

import { RouteRenderer } from '@components/route-renderer/RouteRenderer';

import { routes } from '@routes/dashboard.routes';

const DashboardLayout: FunctionComponent = () => {

    return (
        <RouteRenderer routes={routes} />
    );
}

export default DashboardLayout;