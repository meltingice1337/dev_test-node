import { NextFunction, Request, Response } from "express";
import { HttpException } from "../exceptions/HttpException";

export const exceptionMiddleware = (error: HttpException, _: Request, response: Response, _2: NextFunction) => {
    const status = error.status || 500;
    const message = error.message || 'Something went wrong';
    const code = error.code || 'UNKNOWN';

    response
        .status(status)
        .send({
            status,
            message,
            code
        });
}