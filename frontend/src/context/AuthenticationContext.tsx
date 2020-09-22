import React, { createContext, FunctionComponent, useContext, useState } from 'react';

interface UserData {
    username: string;
    id: string;
}

interface AuthenticationContextData {
    value: UserData | null;

    authenticate: (value: UserData) => void;
}

const AuthenticationContext = createContext<AuthenticationContextData | null>(null);

export const AuthenticationProvider: FunctionComponent = ({ children }) => {
    const [authData, setAuthData] = useState<UserData | null>(null)

    return (
        <AuthenticationContext.Provider value={{ value: authData, authenticate: setAuthData }}>
            {children}
        </AuthenticationContext.Provider >
    )
}

export const useAuthContext = () => useContext(AuthenticationContext);

