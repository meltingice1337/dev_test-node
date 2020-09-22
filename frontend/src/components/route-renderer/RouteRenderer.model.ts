import { UserRoleModel } from "@models/authentication.models";
import { RouteProps } from "react-router-dom";

export interface RoutePropsWithRole extends RouteProps {
    role?: UserRoleModel;
}

export interface RouteRendererProps {
    routes: RoutePropsWithRole[];
    defaultRoute?: string;
}