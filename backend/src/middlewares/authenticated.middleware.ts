import { NextFunction, Request, Response } from 'express';
import { SigninUserResponseDTO, UserRole } from '../entites/UserEntity';
import { HttpException } from '../exceptions/HttpException';

export const authenticated = (role: UserRole, orMore = true) =>
    (req: Request, _: Response, next: NextFunction) => {
        if (!req.locals) {
            return next(new HttpException(401, 'You are not logged in !'));
        } else {
            const user = req.locals as SigninUserResponseDTO;

            if (orMore ? user.role >= role : user.role === role) {
                return next();
            } else {
                return next(new HttpException(403, 'You do not have access to see this !'));
            }
        }
    }
