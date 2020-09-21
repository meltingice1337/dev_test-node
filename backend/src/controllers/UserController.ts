
import { inject } from 'inversify';
import { controller, httpGet, interfaces } from 'inversify-express-utils';
import { AuthenticatedMiddleware } from '../middlewares/authenticated.middleware';

import { UserModel } from '../entites/UserEntity';

import TYPES from '../ioc/types';

import { UserRepository } from '../repository/UserRepository';

@controller("/users", AuthenticatedMiddleware)
export class UserController {

    constructor() { }

    @httpGet('/', )
    public async getUsers() {

    }
}