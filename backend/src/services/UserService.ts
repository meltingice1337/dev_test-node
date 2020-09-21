import { inject, injectable } from "inversify";
import { UserAttributes } from "../entites/UserEntity";
import TYPES from "../ioc/types";
import { UserRepository } from "../repository/UserRepository";

@injectable()
export class UserService {
    constructor(@inject(TYPES.UserRepository) private userRepository: UserRepository) { }
    
    async createUser(user: UserAttributes): Promise<UserAttributes> {
        return (await this.userRepository.create(user)).get();
    }
}