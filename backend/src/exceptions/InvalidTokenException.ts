import { EXCEPTION_CODES } from "./ExceptionCodes";

import { HttpException } from "./HttpException";

export class InvalidTokenException extends HttpException {
    constructor() {
        super(401, 'Invalid token', EXCEPTION_CODES.INVALID_TOKEN)
    }
}