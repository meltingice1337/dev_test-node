import { plainToClass } from "class-transformer";
import { validate, ValidationError } from "class-validator";
import { RequestHandler } from "express";

import { HttpException } from "../exceptions/HttpException";

export const validationMiddleware = <T>(type: any): RequestHandler => {
    return (req, _, next) => {
        const converted = plainToClass(type, req.body, { strategy: 'excludeAll' });
        validate(converted)
            .then((errors: ValidationError[]) => {
                if (errors.length > 0) {
                    const message = errors.map((error: ValidationError) => Object.values(error.constraints || {})).join(', ');
                    next(new HttpException(400, message));
                } else {
                    req.body = converted;
                    next();
                }
            });
    };
}