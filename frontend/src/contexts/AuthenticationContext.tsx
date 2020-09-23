import Axios, { AxiosError } from 'axios';
import React, { createContext, FunctionComponent, useCallback, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import jwt_decode from 'jwt-decode';

import { UserModel } from '@models/authentication.models';

import { useAxios } from '@hooks/axios.hook';
import { EXCEPTION_CODES } from '@utils/ExceptionCodes';

interface HttpException {
    status: number;
    message: string;
    code?: EXCEPTION_CODES
}

interface AuthenticationContextData {
    authUser: UserModel | null;
    authenticate: (token: string) => void;
    logout: () => void;
}

const AuthenticationContext = createContext<AuthenticationContextData>({ authUser: null, authenticate: () => { void 0 }, logout: () => { void 0; } });

export const AuthenticationProvider: FunctionComponent = ({ children }) => {
    const [authUser, setAuthUser] = useState<UserModel | null>(null)

    console.log(Axios.interceptors.response)

    const handleErrorResponse = useCallback((error: AxiosError): void => {
        if (error.response?.data) {
            const exception: HttpException = error.response.data;
            if (exception.code === EXCEPTION_CODES.INVALID_TOKEN) {
                logout();
            } else if (exception.message) {
                toast.error(error.response.data.message)
            }
            return;
        }
        toast.error('Unknown error from the server');
    }, [])

    const { setToken } = useAxios(handleErrorResponse);

    const logout = useCallback(() => {
        localStorage.removeItem('token');
        sessionStorage.removeItem('token');
        setAuthUser(null);
        setToken(null);
    }, [setAuthUser, setToken]);

    const authenticate = useCallback((token: string): void => {
        setToken(token);
        try {
            const decoded = jwt_decode<UserModel>(token);
            setAuthUser(decoded);
        } catch {
            logout();
        }
    }, [setAuthUser, setToken]);

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

