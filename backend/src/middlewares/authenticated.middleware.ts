import { NextFunction, Request, Response } from 'express';
import { SigninUserResponseDTO, UserRole } from '../entites/UserEntity';
import { HttpException } from '../exceptions/HttpException';

export const authenticated = (role: UserRole) =>
    (req: Request, _: Response, next: NextFunction) => {
        console.log(req.locals)
        if (!req.locals) {
            next(new HttpException(401, 'You are not logged in !'));
        } else {
            const user = req.locals as SigninUserResponseDTO;

            if (user.role >= role) {
                next();
            } else {
                next(new HttpException(403, 'You do not have access to see this !'));
            }
        }
        next();
    }
