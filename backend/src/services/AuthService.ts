import bcrypt from 'bcrypt';
import { injectable } from 'inversify';
import { sign, verify } from 'jsonwebtoken';

@injectable()
export class AuthService {
    hashPassword(pass: string): string {
        return bcrypt.hashSync(pass, 12);
    }

    verifyPassword(pass: string, hash: string): boolean {
        return bcrypt.compareSync(pass, hash);
    }

    generate(payload: object): string {
        // TODO implement expires in
        return sign(JSON.parse(JSON.stringify(payload)), process.env.JWT_SECRET || '123');
    }

    verifyToken(token: string): any {
        return verify(token, process.env.JWT_SECRET || '123');
    }
}