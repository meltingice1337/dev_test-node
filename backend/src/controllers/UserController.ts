
import { inject } from 'inversify';
import { controller, httpGet, interfaces } from 'inversify-express-utils';

import { UserModel } from '../entites/UserFactory';

import TYPES from '../ioc/types';

import { UserRepository } from '../repository/UserRepository';

@controller("/users")
export class UserController {

    constructor() { }

    @httpGet("/")
     private async index(): Promise<UserModel[]> {
        // return this.userRepository.findAll();
    }
}