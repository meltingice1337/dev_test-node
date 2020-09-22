import { inject, injectable } from "inversify";
import { UserAttributes, UserModel, UserStatic } from "../entites/UserEntity";
import TYPES from "../ioc/types";

@injectable()
export class UserRepository {
    constructor(@inject(TYPES.User) private readonly user: UserStatic) { }

    async create(user: UserAttributes): Promise<UserModel> {
       return this.user.create(user);
    }

    async getUserByUsername(username: string): Promise<UserModel | null> {
        return this.user.findOne({ where: { username } });
    }

    async getUsersByCreationUser(creationId: number): Promise<UserModel[]> {
        return this.user.findAll({ where: { createdById: creationId } });
    }
}