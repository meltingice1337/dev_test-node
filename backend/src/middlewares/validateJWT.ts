import { NextFunction, Response, Request } from 'express';
import { Container } from 'inversify';
import { HttpException } from '../exceptions/HttpException';
import { AuthService } from '../services/AuthService';
import TYPES from '../ioc/types';
import { InvalidTokenException } from '../exceptions/InvalidTokenException';

const extractJwt = (req: Request) => {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        return req.headers.authorization.split(' ')[1];
    }
}

export const validateJWT = (container: Container) => {
    // TODO remove JWT validation from healthcheck
    const authService = container.get<AuthService>(TYPES.AuthService);
    return (req: Request, res: Response, next: NextFunction) => {
        const token = extractJwt(req);
        if (token) {
            try {
                req.locals = authService.verifyToken(token);
            } catch {
                throw new InvalidTokenException();
            }
        }
        next();
    }
}
