import axios, { AxiosError, AxiosRequestConfig } from "axios"
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

const handleRequest = (token: string, request: AxiosRequestConfig): AxiosRequestConfig => {
    if (request.url) {
        request.headers['Authorization'] = `Bearer ${token}`;
    }
    return request;
}

const handleErrorResponse = (error: AxiosError): void => {
    //TODO deauth user if incorrect token
    if (error.response?.data?.message) {
        toast.error(error.response.data.message)
    }
}

export const useAxios = () => {
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
    }, []);

    return { setToken };
}