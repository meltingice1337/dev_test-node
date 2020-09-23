import React, { FunctionComponent, MouseEvent, useMemo } from 'react';
import { Link, matchPath, useLocation } from 'react-router-dom';

import { RouteRenderer } from '@components/route-renderer/RouteRenderer';

import { routes } from '@routes/dashboard.routes';
import { useAuthContext } from '@contexts/AuthenticationContext';
import { UserRoleModel } from '@models/authentication.models';
import { dashboardLayoutAccess, DashboardLayoutAccess } from './DashboardLayout.config';
import { usePermissions } from '@hooks/permissions.hook';

const DashboardLayout: FunctionComponent = () => {

    const { authUser, logout } = useAuthContext();
    const { hasRole } = usePermissions();
    const location = useLocation();

    const filteredAccess = useMemo(() => dashboardLayoutAccess.filter(a => hasRole(a.role)), [authUser, hasRole]);

    const onLogoutClick = (event: MouseEvent) => {
        event.preventDefault();
        logout();
    }

    const renderNavigation = () => {
        if (filteredAccess.length > 1) {
            const activeRoute = (access: DashboardLayoutAccess) => matchPath(location.pathname, { path: access.link })

            return (
                <nav className="nav nav-pills">
                    {
                        filteredAccess.map((access, index) => (
                            <li className="nav-item" key={`nav-i-${index}`}>
                                <Link className={`nav-link ${activeRoute(access) ? 'active' : ''}`} to={access.link}>{access.label}</Link>
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
            <div className="d-flex">
                <h1 className="mt-2">Welcome, {authUser?.username} {authUser?.imageUrl && <img src={authUser?.imageUrl} alt="Profile picture" className="url-image" />}</h1>
                <a href="#" className="ml-auto align-self-center" onClick={onLogoutClick}>Logout</a>
            </div>
            <h5>You are logged in as an <i>{authUser?.role === UserRoleModel.Internal ? 'Internal' : 'External'}</i> user </h5>
            {renderNavigation()}
            <div className="tab-content mt-4">
                <RouteRenderer routes={routes} />
            </div>
        </div>

    );
}

export default DashboardLayout;