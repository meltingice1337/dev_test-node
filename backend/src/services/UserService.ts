import { inject, injectable } from "inversify";

import { ExternalUserResponseDTO, UserAttributes, UserModel, UserRole } from "../entites/UserEntity";
import { HttpException } from "../exceptions/HttpException";
import { UserRepository } from "../repository/UserRepository";

import TYPES from "../ioc/types";
import { plainToClass } from "class-transformer";

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

    async createExternalUser(externalUserId: number, user: UserAttributes): Promise<ExternalUserResponseDTO> {
        const createdUser = await this.userRepository.create({ ...user, role: UserRole.External, createdById: externalUserId });
        return plainToClass(ExternalUserResponseDTO, createdUser.get(), { strategy: 'excludeAll' });
    }

    async getExternalUsers(user: UserAttributes): Promise<ExternalUserResponseDTO[]> {
        const users = await this.userRepository.getUsersByCreationUser(user.id);
        return users.map(user => plainToClass(ExternalUserResponseDTO, user.get(), { strategy: 'excludeAll' }));
    }
}