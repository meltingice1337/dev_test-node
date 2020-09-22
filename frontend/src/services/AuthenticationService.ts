import axios, { AxiosPromise, AxiosResponse } from 'axios';

import { LoginUserModel } from '@models/authentication.models';

const AuthenticationService = {
    login: async (user: LoginUserModel): Promise<AxiosResponse<string>> => await axios.post('/auth/signin', user)
}

export default AuthenticationService;