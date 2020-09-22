import { plainToClass } from 'class-transformer';
import { Request } from 'express';
import { inject } from 'inversify';
import { controller, httpPost, request } from 'inversify-express-utils'
import { SigninUserDTO, SigninUserResponseDTO, SignupUserDTO, SignupUserResponseDTO, UserAttributes, UserModel, UserRole } from '../entites/UserEntity';
import { HttpException } from '../exceptions/HttpException';

import TYPES from '../ioc/types';
import { validationMiddleware } from '../middlewares/validation.middleware';

import { AuthService } from '../services/AuthService';
import { UserService } from '../services/UserService';

@controller('/auth')
export class AuthController {
    constructor(
        @inject(TYPES.AuthService) private readonly authService: AuthService,
        @inject(TYPES.UserService) private readonly userService: UserService,
    ) { }

    @httpPost('/signup', validationMiddleware(SignupUserDTO))
    public async signUp(@request() req: Request<null, null, UserAttributes>): Promise<SignupUserResponseDTO> {
        const hashedPassword = this.authService.hashPassword(req.body.password);
        try {
            const createdUser = await this.userService.createUser({ ...req.body, password: hashedPassword, role: UserRole.Internal });
            return plainToClass(SignupUserResponseDTO, createdUser, { strategy: 'excludeAll' });
        } catch(ex) {
            console.log(ex);
            throw new HttpException(400, 'This user already registered');
        }
    }

    @httpPost('/signin', validationMiddleware(SigninUserDTO))
    public async signIn(@request() req: Request): Promise<string> {
        try {
            const foundUser = await this.userService.findUser(req.body.username);
            const validPassword = await this.authService.verifyPassword(req.body.password, foundUser.password);
            if (validPassword) {
                const formattedUser = plainToClass(SigninUserResponseDTO, foundUser, { strategy: 'excludeAll' });
                return this.authService.generate(formattedUser);
            } else {
                throw new Error();
            }
        } catch(ex) {
            console.log(ex);
            throw new HttpException(401, 'Invalid credentials !');
        }
    }
}