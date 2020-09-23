import axios, { AxiosError, AxiosRequestConfig } from "axios"
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

import { EXCEPTION_CODES } from "@utils/ExceptionCodes";
import { useAuthContext } from "@contexts/AuthenticationContext";

const handleRequest = (token: string, request: AxiosRequestConfig): AxiosRequestConfig => {
    if (request.url) {
        request.headers['Authorization'] = `Bearer ${token}`;
    }
    return request;
}

export const useAxios = (
    handleErrorResponse?: (error: AxiosError) => void
) => {
    const [token, setToken] = useState<string | null>(null);


    const reqIntRef = useRef<number>();

    useEffect(() => {
        if (token) {
            reqIntRef.current = axios.interceptors.request.use(handleRequest.bind(null, token));
        } else if (reqIntRef.current !== undefined) {
            axios.interceptors.request.eject(reqIntRef.current);
            reqIntRef.current = undefined;
        }

        return () => {
            if (reqIntRef.current) {
                axios.interceptors.request.eject(reqIntRef.current);
                reqIntRef.current = undefined;
            }
        }
    }, [token, reqIntRef]);

    useEffect(() => {
        axios.defaults.baseURL = process.env.BACKEND_API;
        const ref = axios.interceptors.response.use((response) => response, handleErrorResponse);
        return () => {
            axios.interceptors.response.eject(ref);
        }
    }, [handleErrorResponse]);

    return { setToken };
}