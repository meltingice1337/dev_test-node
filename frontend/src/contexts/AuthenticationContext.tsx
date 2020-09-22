import React, { createContext, FunctionComponent, useCallback, useContext, useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';

import { UserModel } from '@models/authentication.models';

import { useAxios } from '@hooks/axios.hook';

interface AuthenticationContextData {
    authUser: UserModel | null;
    authenticate: (token: string) => void;
    logout: () => void;
}

const AuthenticationContext = createContext<AuthenticationContextData>({ authUser: null, authenticate: () => { void 0 }, logout: () => { void 0; } });

export const AuthenticationProvider: FunctionComponent = ({ children }) => {
    const [authUser, setAuthUser] = useState<UserModel | null>(null)

    const { setRequestInterceptor } = useAxios();

    const authenticate = useCallback((token: string): void => {
        setRequestInterceptor(token);
        const decoded = jwt_decode<UserModel>(token);
        setAuthUser(decoded);
    }, [setAuthUser]);

    const logout = useCallback(() => {
        localStorage.removeItem('token');
        sessionStorage.removeItem('token');
        setAuthUser(null);
    }, [setAuthUser]);

    useEffect(() => {
        const localStorageToken = localStorage.getItem('token');
        const sessionStorageToken = sessionStorage.getItem('token');
        if (localStorageToken) {
            authenticate(localStorageToken);
        } else if (sessionStorageToken) {
            authenticate(sessionStorageToken);
        }
    }, [authenticate]);

    return (
        <AuthenticationContext.Provider value={{ authUser, authenticate, logout }}>
            {children}
        </AuthenticationContext.Provider >
    )
}

export const useAuthContext = () => useContext(AuthenticationContext);

