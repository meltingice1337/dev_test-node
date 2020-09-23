import { RoutePropsWithRole } from '@components/route-renderer/RouteRenderer.model';
import { UserRoleModel } from '@models/authentication.models';
import { lazy, FunctionComponent } from 'react';

const Users = lazy((): Promise<{ default: FunctionComponent }> => import('@pages/dashboard/users/Users'));
const OwnNote = lazy((): Promise<{ default: FunctionComponent }> => import('@pages/dashboard/notes/OwnNote'));
const UserNotes = lazy((): Promise<{ default: FunctionComponent }> => import('@pages/dashboard/notes/UserNotes'));

export const routes: RoutePropsWithRole[] = [
    {
        component: Users,
        role: UserRoleModel.Internal,
        path: '/users'
    },
    {
        component: UserNotes,
        role: UserRoleModel.Internal,
        path: '/user-notes'
    },
    {
        component: OwnNote,
        role: UserRoleModel.External,
        path: '/note'
    }
]