import axios, { AxiosPromise, AxiosResponse } from 'axios';

import { ExternalUserModel } from '@models/user.models';

const UserService = {
    getAllExternal: async (): Promise<AxiosResponse<ExternalUserModel[]>> => axios.get('/users'),
}

export default UserService;