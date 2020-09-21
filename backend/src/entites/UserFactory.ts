import { Sequelize, DataTypes, Model, ModelDefined, BuildOptions } from "sequelize";

interface UserDataAttributes {
    username: string;
    password: string;
}

export interface UserAttributes {
    id: number;
    data: UserDataAttributes;
}

export interface UserModel extends Model<UserAttributes>, UserAttributes { }

export class User extends Model<UserModel, UserAttributes> { }

export type UserStatic = typeof Model & {
    new(values?: object, options?: BuildOptions): UserModel;
};

export function UserFactory(sequelize: Sequelize): UserStatic {
    return sequelize.define('users', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: DataTypes.STRING,
        password: DataTypes.STRING,

    })
}
