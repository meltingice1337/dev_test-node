
import { Request } from 'express';
import { controller, httpDelete, httpGet, httpPost, interfaces, request, requestParam } from 'inversify-express-utils';
import { authenticated } from '../middlewares/authenticated.middleware';

import TYPES from '../ioc/types';
import { ExternalUserResponseDTO, SigninUserDTO, UserRole } from '../entites/UserEntity';
import { inject } from 'inversify';

import { UserService } from '../services/UserService';
import { AuthService } from '../services/AuthService';
import { InstagramService } from '../services/InstagramService';

import { validationMiddleware } from '../middlewares/validation.middleware';
import { HttpException } from '../exceptions/HttpException';

@controller("/users", authenticated(UserRole.Internal))
export class UserController {

    constructor(
        @inject(TYPES.UserService) private readonly userService: UserService,
        @inject(TYPES.AuthService) private readonly authService: AuthService,
        @inject(TYPES.InstagramService) private readonly instagramService: InstagramService
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
            const imageUrl = await this.instagramService.findHashtagImage(req.body.username)
            const hashedPassword = this.authService.hashPassword(req.body.password);
            const user = await this.userService.createExternalUser(authUser.id, { ...req.body, password: hashedPassword, imageUrl });
            return user;
        } catch (e) {
            console.log(e)
            throw new HttpException(400, 'A user with this is username is already existent');
        }
    }

    @httpDelete('/:id')
    public async deleteExternalUser(@requestParam('id') id: number, @request() req: Request) {
        console.log('test')
        const authUser = req.locals;
        try {
            const result = await this.userService.deleteExternalUser(id, authUser);
            console.log({ result })
            if (!result) {
                throw new HttpException(400, 'User not found or you did not create this user');
            }
        } catch (e) {
            console.log(e)
            throw new HttpException(400, 'User not found or you did not create this user');
        }
    }
}