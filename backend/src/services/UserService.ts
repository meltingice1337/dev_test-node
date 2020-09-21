import { inject } from "inversify";
import { UserAttributes } from "../entites/UserFactory";
import TYPES from "../ioc/types";
import { UserRepository } from "../repository/UserRepository";

export class UserService {
    constructor(@inject(TYPES.UserRepository) private userRepository: UserRepository) { }
    
    createUser(user: UserAttributes) {
        const 
    }
}