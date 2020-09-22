import { useAuthContext } from "@contexts/AuthenticationContext"
import { UserRoleModel } from "@models/authentication.models";
import { useCallback } from "react";

export const usePermissions = () => {
    const { authUser } = useAuthContext();

    const hasRole = useCallback((role: UserRoleModel, orMore = false) => {
        if (authUser) {
            return orMore ? authUser.role >= role : authUser.role === role;
        }

        return false;
    }, [authUser])

    return { hasRole };
}