import { lazy, FunctionComponent } from 'react';
import { RouteProps } from 'react-router-dom';

const SignUp = lazy((): Promise<{ default: FunctionComponent }> => import('@pages/authentication/sign-up/SignUp'));

export const routes: RouteProps[] = [
    { 
        component: SignUp,
        path: '/signup'
    }
]