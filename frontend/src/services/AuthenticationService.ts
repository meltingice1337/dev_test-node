import axios, { AxiosPromise, AxiosResponse } from 'axios';

import { LoginUserModel } from '@models/authentication.models';

const AuthenticationService = {
    login: async (user: LoginUserModel): Promise<AxiosResponse<string>> => axios.post('/auth/signin', user),
    signup: async (user: LoginUserModel): Promise<AxiosResponse<string>> => axios.post('/auth/signup', user)
}

export default AuthenticationService;