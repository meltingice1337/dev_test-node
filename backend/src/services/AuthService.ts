import bcrypt from 'bcrypt';
import { injectable } from 'inversify';

@injectable()
export class AuthService {
    hashPassword(pass: string): string {
        return bcrypt.hashSync(pass, 12);
    }
}