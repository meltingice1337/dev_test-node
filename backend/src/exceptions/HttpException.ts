import { EXCEPTION_CODES } from './ExceptionCodes';
export class HttpException extends Error {
    constructor(public status: number, public message: string, public code?: EXCEPTION_CODES) {
        super(message);
    }
}