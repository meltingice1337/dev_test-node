import { lazy, FunctionComponent } from 'react';
import { RouteProps } from 'react-router-dom';

const AuthenticationLayout = lazy((): Promise<{ default: FunctionComponent }> => import('@pages/authentication/AuthenticationLayout'));

export const routes: RouteProps[] = [
    { 
        component: AuthenticationLayout,
        path: '/'
    }
]