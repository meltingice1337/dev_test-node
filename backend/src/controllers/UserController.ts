
import { controller, httpGet, interfaces } from 'inversify-express-utils';
import { authenticated } from '../middlewares/authenticated.middleware';

import { UserRole } from '../entites/UserEntity';

@controller("/users", authenticated(UserRole.Internal))
export class UserController {

    constructor() { }

    @httpGet('/', )
    public async getUsers() {

    }
}