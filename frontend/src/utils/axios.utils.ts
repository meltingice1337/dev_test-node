import axios, { AxiosError, AxiosRequestConfig } from "axios"
import { useEffect, useRef, useState } from "react";

const handleRequest = (token: string, request: AxiosRequestConfig): AxiosRequestConfig => {
    if (request.url) {
        request.headers['Authorization'] = `Bearer ${token}`;
    }
    return request;
}

const handleErrorResponse = (error: AxiosError): void => {
    console.log({ error })
}

export const useAxios = (): {
    setRequestInterceptor: (token: string) => void;
} => {

    const reqIntRef = useRef<number>();

    const setRequestInterceptor = (token: string) => {
        if (reqIntRef.current) {
            axios.interceptors.request.eject(reqIntRef.current);
        }

        reqIntRef.current = axios.interceptors.request.use(handleRequest.bind(null, token));
    }

    useEffect(() => {
        axios.defaults.baseURL = process.env.BACKEND_API;
        axios.interceptors.response.use((response) => response, handleErrorResponse);

    }, [])

    return { setRequestInterceptor };
}