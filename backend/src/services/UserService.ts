import { inject, injectable } from "inversify";

import { UserAttributes } from "../entites/UserEntity";
import { HttpException } from "../exceptions/HttpException";
import { UserRepository } from "../repository/UserRepository";

import TYPES from "../ioc/types";

@injectable()
export class UserService {
    constructor(@inject(TYPES.UserRepository) private userRepository: UserRepository) { }

    async createUser(user: UserAttributes): Promise<UserAttributes> {
        return (await this.userRepository.create(user)).get();
    }

    async findUser(username: string): Promise<UserAttributes> {
        const user = await this.userRepository.getUserByUsername(username);
        if (!user) {
            throw new HttpException(404, 'Cannot find user');
        } else {
            return user.get();
        }
    }
}