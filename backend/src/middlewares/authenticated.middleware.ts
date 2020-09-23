import { NextFunction, Request, Response } from 'express';
import { Container } from 'inversify';

import TYPES from '../ioc/types';
import { UserRepository } from '../repository/UserRepository';

import { SigninUserResponseDTO, UserAttributes, UserRole } from '../entites/UserEntity';

import { HttpException } from '../exceptions/HttpException';
import { InvalidTokenException } from '../exceptions/InvalidTokenException';

const checkUser = async (req: Request): Promise<boolean> => {
    const user = req.locals as UserAttributes;
    const reflected: { container: Container } = Reflect.getMetadata('inversify-express-utils:httpcontext', req);
    const userRepository = reflected.container.get(TYPES.UserRepository) as UserRepository;
    const dbUser = await userRepository.getUserById(user.id);
    return dbUser !== null;
}

export const authenticated = (role: UserRole, orMore = true) =>
    async (req: Request, _: Response, next: NextFunction) => {
        if (!req.locals) {
            return next(new HttpException(401, 'You are not logged in !'));
        } else {

            const userExists = await checkUser(req);
            if (!userExists) {
                next(new InvalidTokenException())
            }

            const user = req.locals as SigninUserResponseDTO;
            if (orMore ? user.role >= role : user.role === role) {
                return next();
            } else {
                return next(new HttpException(403, 'You do not have access to see this !'));
            }
        }
    }
