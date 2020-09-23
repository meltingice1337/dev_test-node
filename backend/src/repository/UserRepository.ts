import { inject, injectable } from "inversify";
import { Op, Sequelize } from "sequelize";

import { UserAttributes, UserModel, UserRole, UserStatic } from "../entites/UserEntity";
import TYPES from "../ioc/types";

@injectable()
export class UserRepository {
    constructor(@inject(TYPES.User) private readonly user: UserStatic) { }

    async create(user: UserAttributes): Promise<UserModel> {
        return this.user.create(user);
    }

    async getUserByUsernameWithCreator(username: string): Promise<UserModel | null> {
        return this.user.findOne({ where: { username }, include: [{ on: { id: { [Op.eq]: Sequelize.col('users.createdById') } }, model: this.user, as: 'creator' }] });
    }

    async getUserById(id: number): Promise<UserModel | null> {
        return this.user.findOne({ where: { id } });
    }

    async getUsersByCreationUser(creationId: number): Promise<UserModel[]> {
        return this.user.findAll({ where: { createdById: creationId } });
    }

    async deleteExternalUserByIdAndOwnage(id: number, createdById: number): Promise<number | null> {
        return this.user.destroy({ where: { id, createdById, role: UserRole.External } });
    }
}