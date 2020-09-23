import { UserRoleModel } from "@models/authentication.models";

export interface DashboardLayoutAccess {
    role: UserRoleModel;
    link: string;
    label: string;
}

export const dashboardLayoutAccess: DashboardLayoutAccess[] = [
    {
        link: '/users',
        label: 'Users',
        role: UserRoleModel.Internal
    },
    {
        link: '/user-notes',
        label: 'User Notes',
        role: UserRoleModel.Internal
    },
    {
        link: '/note',
        label: 'Note',
        role: UserRoleModel.External
    }
]