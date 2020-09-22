import React, { FunctionComponent, Suspense, useLayoutEffect, useMemo } from 'react';
import { matchPath, Route, RouteProps, Switch, useHistory, useLocation } from 'react-router-dom';

import { Spinner } from '@components/spinner/Spinner';
import { RoutePropsWithRole, RouteRendererProps } from './RouteRenderer.model';
import { usePermissions } from '@hooks/permissions.hook';

export const RouteRenderer: FunctionComponent<RouteRendererProps> = (props: RouteRendererProps) => {
    const location = useLocation();
    const history = useHistory();

    const { hasRole } = usePermissions();

    const filteredRoutes = useMemo(() => props.routes.filter(r => (r.role !== undefined) ? hasRole(r.role) : true), [props.routes, hasRole])

    useLayoutEffect(() => {
        const exists = filteredRoutes.find(r => matchPath(location.pathname, { path: r.path }));
        if (!exists && (
            props.defaultRoute || filteredRoutes.length > 0)
        ) {
            const route = props.defaultRoute || filteredRoutes[0].path! as string;
            history.push(route)
        }
    }, [location, filteredRoutes])

    const renderRoutes = (): JSX.Element[] => {
        return filteredRoutes.map((props: RoutePropsWithRole, index: number): JSX.Element => {
            return (
                <Route {...props} key={index} />
            );
        });
    }

    return (
        <Suspense fallback={<Spinner />}>
            <Switch>
                {renderRoutes()}
            </Switch>
        </Suspense>
    )
}