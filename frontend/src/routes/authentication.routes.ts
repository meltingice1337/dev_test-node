import { lazy, FunctionComponent } from 'react';
import { RouteProps } from 'react-router-dom';

const SignIn = lazy((): Promise<{ default: FunctionComponent }> => import('@pages/authentication/sign-in/SignIn'));

export const routes: RouteProps[] = [
    {
        component: SignIn,
        path: '/signin'
    }
]