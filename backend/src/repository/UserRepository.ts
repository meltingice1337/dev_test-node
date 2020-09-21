import { inject, injectable } from "inversify";
import { Model } from "sequelize";
import { User, UserAttributes, UserModel, UserStatic } from "../entites/UserEntity";
import TYPES from "../ioc/types";

@injectable()
export class UserRepository {
    constructor(@inject(TYPES.User) private readonly user: UserStatic) { }

    async create(user: UserAttributes): Promise<UserModel> {
       return this.user.create(user);
    }
}