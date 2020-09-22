import axios, { AxiosPromise } from 'axios';

import { LoginUserModel } from '@models/authentication.models';

const AuthenticationService = {
    login: (user: LoginUserModel): AxiosPromise<string> => axios.post('/auth/login', user)
}

export default AuthenticationService;