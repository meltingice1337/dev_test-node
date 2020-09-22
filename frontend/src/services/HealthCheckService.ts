import axios, { AxiosResponse } from 'axios';

const HealthCheckService = {
    getHealthCheck: async (): Promise<AxiosResponse<boolean>> => axios.get('/healthcheck'),
}

export default HealthCheckService;