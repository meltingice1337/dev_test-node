import axios, { AxiosPromise, AxiosResponse } from 'axios';

import { CreateUserModel, ExternalUserModel } from '@models/user.models';

const UserService = {
    getAllExternal: async (): Promise<AxiosResponse<ExternalUserModel[]>> => axios.get('/users'),
    createUser: async (user: CreateUserModel): Promise<AxiosResponse<ExternalUserModel>> => axios.post('/users', user),
    deleteUser: async (userId: number): Promise<AxiosResponse<ExternalUserModel>> => axios.delete(`/users/${userId}`),
}

export default UserService;