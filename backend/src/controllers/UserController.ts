
import { inject } from 'inversify';
import { controller, httpGet, interfaces } from 'inversify-express-utils';

import { UserModel } from '../entites/UserEntity';

import TYPES from '../ioc/types';

import { UserRepository } from '../repository/UserRepository';

@controller("/users")
export class UserController {

    constructor() { }
}