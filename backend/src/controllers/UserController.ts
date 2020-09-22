
import { Request } from 'express';
import { controller, httpGet, httpPost, interfaces, request } from 'inversify-express-utils';
import { authenticated } from '../middlewares/authenticated.middleware';

import TYPES from '../ioc/types';
import { ExternalUserResponseDTO, SigninUserDTO, UserRole } from '../entites/UserEntity';
import { inject } from 'inversify';

import { UserService } from '../services/UserService';
import { AuthService } from '../services/AuthService';

import { validationMiddleware } from '../middlewares/validation.middleware';
import { HttpException } from '../exceptions/HttpException';

@controller("/users", authenticated(UserRole.Internal))
export class UserController {

    constructor(
        @inject(TYPES.UserService) private readonly userService: UserService,
        @inject(TYPES.AuthService) private readonly authService: AuthService
    ) { }

    @httpGet('/')
    public async getExternalUsers(@request() req: Request): Promise<ExternalUserResponseDTO[]> {
        const user = req.locals;
        const externalUsers = await this.userService.getExternalUsers(user);
        return externalUsers;
    }

    @httpPost('/', validationMiddleware(SigninUserDTO))
    public async createExternalUser(@request() req: Request): Promise<ExternalUserResponseDTO> {
        const authUser = req.locals;
        try {
            const hashedPassword = this.authService.hashPassword(req.body.password);
            const user = await this.userService.createExternalUser(authUser.id, { ...req.body, password: hashedPassword });
            return user;
        } catch (e) {
            console.log(e)
            throw new HttpException(400, 'A user with this is username is already existent');
        }
    }
}