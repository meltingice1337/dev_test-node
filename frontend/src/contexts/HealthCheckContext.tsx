import React, { useEffect, createContext, FunctionComponent, useState, useCallback } from 'react';

import HealthCheckService from '@services/HealthCheckService';
import { useAxios } from '@hooks/axios.hook';

interface HealthCheckContextData {
    healtcheck: boolean;
}

const HealthCheckContext = createContext<HealthCheckContextData>({ healtcheck: false });

export const HealthCheckProvider: FunctionComponent = (props) => {
    const [healtcheck, setHealthcheck] = useState(false);

    useAxios();

    const checkHealth = useCallback(async () => {
        const response = await HealthCheckService.getHealthCheck();
        if (response && response.data) {
            setHealthcheck(true);
        }

    }, [setHealthcheck])

    useEffect(() => {
        checkHealth();
    }, [checkHealth])

    return (
        <HealthCheckContext.Provider value={{ healtcheck }}>
            {healtcheck ? props.children : 'The server has no health'}
        </HealthCheckContext.Provider>
    )
}

