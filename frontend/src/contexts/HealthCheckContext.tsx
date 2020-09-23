import React, { useEffect, createContext, FunctionComponent, useState, useCallback } from 'react';

import HealthCheckService from '@services/HealthCheckService';
import { useAxios } from '@hooks/axios.hook';

interface HealthCheckContextData {
    healtcheck: boolean;
}

const HealthCheckContext = createContext<HealthCheckContextData>({ healtcheck: false });

export const HealthCheckProvider: FunctionComponent = (props) => {
    const [healtcheck, setHealthcheck] = useState(false);
    const [loading, setLoading] = useState(true);

    useAxios();

    const checkHealth = useCallback(async () => {
        const response = await HealthCheckService.getHealthCheck();
        setLoading(false);
        if (response && response.data) {
            setHealthcheck(true);
        }

    }, [setHealthcheck])

    useEffect(() => {
        checkHealth();
    }, [checkHealth])

    return (
        <HealthCheckContext.Provider value={{ healtcheck }}>
            {!loading && (healtcheck ? props.children : 'The server has no health')}
        </HealthCheckContext.Provider>
    )
}

