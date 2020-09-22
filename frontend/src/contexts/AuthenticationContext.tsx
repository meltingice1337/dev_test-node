import React, { createContext, FunctionComponent, useContext, useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';

import { UserModel } from '@models/authentication.models';

import { useAxios } from '@utils/axios.utils';

interface AuthenticationContextData {
    authUser: UserModel | null;
    authenticate: (token: string) => void;
}

const AuthenticationContext = createContext<AuthenticationContextData>({ authUser: null, authenticate: () => { void 0 } });

export const AuthenticationProvider: FunctionComponent = ({ children }) => {
    const [authUser, setAuthUser] = useState<UserModel | null>(null)

    const { setRequestInterceptor } = useAxios();

    const authenticate = (token: string): void => {
        setRequestInterceptor(token);
        const decoded = jwt_decode<UserModel>(token);
        setAuthUser(decoded);
    }

    useEffect(() => {
        const localStorageToken = localStorage.getItem('token');
        const sessionStorageToken = sessionStorage.getItem('token');
        if (localStorageToken) {
            authenticate(localStorageToken);
        } else if (sessionStorageToken) {
            authenticate(sessionStorageToken);
        }
    }, []);

    return (
        <AuthenticationContext.Provider value={{ authUser, authenticate }}>
            {children}
        </AuthenticationContext.Provider >
    )
}

export const useAuthContext = () => useContext(AuthenticationContext);

