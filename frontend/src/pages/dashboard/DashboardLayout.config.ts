import { UserRoleModel } from "@models/authentication.models";

interface DashboardLayoutAccess {
    role: UserRoleModel;
    link: string;
    label: string;
}
export const dashboardLayoutAccess: DashboardLayoutAccess[] = [
    {
        link: '/users',
        label: 'Users',
        role: UserRoleModel.Internal
    }
]