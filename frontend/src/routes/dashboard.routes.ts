import { RoutePropsWithRole } from '@components/route-renderer/RouteRenderer.model';
import { UserRoleModel } from '@models/authentication.models';
import { lazy, FunctionComponent } from 'react';
import { RouteProps } from 'react-router-dom';

const Users = lazy((): Promise<{ default: FunctionComponent }> => import('@pages/dashboard/users/Users'));

export const routes: RoutePropsWithRole[] = [
    {
        component: Users,
        role: UserRoleModel.External,
        path: '/users'
    }
]