import { lazy, FunctionComponent } from 'react';
import { RouteProps } from 'react-router-dom';

const SignIn = lazy((): Promise<{ default: FunctionComponent }> => import('@pages/authentication/sign-in/SignIn'));
const SignUp = lazy((): Promise<{ default: FunctionComponent }> => import('@pages/authentication/sign-up/SignUp'));

export const routes: RouteProps[] = [
    {
        component: SignIn,
        path: '/signin'
    },
    {
        component: SignUp,
        path: '/signup'
    }
]