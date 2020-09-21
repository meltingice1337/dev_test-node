import { hash } from 'bcrypt';
import { plainToClass } from 'class-transformer';
import { create } from 'domain';
import { Request } from 'express';
import { inject } from 'inversify';
import { controller, httpGet, httpPost, request } from 'inversify-express-utils'
import { SignupUserDTO, SignupUserResponseDTO, UserAttributes, UserModel } from '../entites/UserEntity';
import { HttpException } from '../exceptions/HttpException';

import TYPES from '../ioc/types';
import { validationMiddleware } from '../middlewares/validationMiddleware';

import { AuthService } from '../services/AuthService';
import { UserService } from '../services/UserService';

@controller('/auth')
export class AuthController {
    constructor(
        @inject(TYPES.AuthService) private readonly authService: AuthService,
        @inject(TYPES.UserService) private readonly userService: UserService,
    ) { }

    @httpPost('/signup', validationMiddleware(SignupUserDTO))
    public async signUp(@request() req: Request<null, UserModel, UserAttributes>): Promise<SignupUserResponseDTO> {
        const hashedPassword = this.authService.hashPassword(req.body.password);
        try {
            const createdUser = await this.userService.createUser({ ...req.body, password: hashedPassword });
            return plainToClass(SignupUserResponseDTO, createdUser, { strategy: 'excludeAll' });
        } catch {
            throw new HttpException(400, 'This user already registered');
        }
    }


}