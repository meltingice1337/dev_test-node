import { NextFunction, Request,Response } from 'express';
import { inject, injectable } from 'inversify';
import { BaseMiddleware } from 'inversify-express-utils';
import { UserRole } from '../entites/UserEntity';
import { AuthService } from '../services/AuthService';
import TYPES from '../ioc/types';

@injectable()
export class AuthenticatedMiddleware {
    constructor(
        @inject(TYPES.AuthService) private readonly authService: AuthService,
    ) {}

    public handler(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        next();
    }
}
