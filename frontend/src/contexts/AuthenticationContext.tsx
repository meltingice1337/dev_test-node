import React, { createContext, FunctionComponent, useContext, useState } from 'react';

import { useAxios } from '@utils/axios.utils';

interface UserData {
    username: string;
    id: string;
}

interface AuthenticationContextData {
    value: UserData | null;

    authenticate: (token: string) => void;
}

const AuthenticationContext = createContext<AuthenticationContextData | null>(null);

export const AuthenticationProvider: FunctionComponent = ({ children }) => {
    const [authData, setAuthData] = useState<UserData | null>(null)

    const { setRequestInterceptor } = useAxios();

    const authenticate = (token: string): void => {
        setRequestInterceptor(token);
    }


    return (
        <AuthenticationContext.Provider value={{ value: authData, authenticate }}>
            {children}
        </AuthenticationContext.Provider >
    )
}

export const useAuthContext = () => useContext(AuthenticationContext);

