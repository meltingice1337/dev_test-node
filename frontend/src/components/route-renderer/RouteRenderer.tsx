import React, { FunctionComponent, Suspense } from 'react';
import { Route, RouteProps, Switch } from 'react-router-dom';

import { Spinner } from '@components/spinner/Spinner';
import { RouteRendererProps } from './RouteRenderer.model';

export const RouteRenderer: FunctionComponent<RouteRendererProps> = (props: RouteRendererProps) => {

    const renderRoutes = (): JSX.Element[] => {
        return props.routes.map((props: RouteProps, index: number): JSX.Element => {
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