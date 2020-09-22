import React, { FunctionComponent, useMemo } from 'react';

import { RouteRenderer } from '@components/route-renderer/RouteRenderer';

import { routes } from '@routes/dashboard.routes';
import { useAuthContext } from '@contexts/AuthenticationContext';
import { UserRoleModel } from '@models/authentication.models';
import { dashboardLayoutAccess } from './DashboardLayout.config';
import { usePermissions } from '@hooks/permissions.hook';
import { Link } from 'react-router-dom';

const DashboardLayout: FunctionComponent = () => {

    const { authUser } = useAuthContext();
    const { hasRole } = usePermissions();

    const filteredAccess = useMemo(() => dashboardLayoutAccess.filter(a => hasRole(a.role)), [authUser, hasRole]);

    const renderNavigation = () => {
        if (filteredAccess.length > 1) {
            return (
                <nav className="nav nav-pills">
                    {
                        filteredAccess.map((access, index) => (
                            <li className="nav-item" key={`nav-i-${index}`}>
                                <Link className="nav-link active" to={access.link}>{access.label}</Link>
                            </li>
                        ))
                    }
                </nav>
            )
        }
        return null;
    }

    return (
        <div className="ml-auto mr-auto mt-4 mb-4 container bg-white rounded p-4">
            <h1 className="mt-2">Welcome, {authUser?.username}</h1>
            <h5>You are logged in as an <i>{authUser?.role === UserRoleModel.Internal ? 'Internal' : 'External'}</i> user</h5>
            {renderNavigation()}
            <div className="tab-content mt-4">
                <RouteRenderer routes={routes} />
            </div>
        </div>

    );
}

export default DashboardLayout;