import { Sequelize, DataTypes, Model, ModelDefined, BuildOptions } from "sequelize";

import { IsString } from 'class-validator'
import { Expose } from "class-transformer";

export enum UserRole { Internal, External };

export interface UserAttributes {
    id: number;
    username: string;
    password: string;
    role: UserRole;
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
        username: {
            type: DataTypes.STRING,
            unique: true
        },
        password: DataTypes.STRING,
        role: {
            type: DataTypes.NUMBER,
            defaultValue: 0
        }
    })
}

export class SignupUserDTO {
    @IsString()
    @Expose()
    username!: string;

    @IsString()
    @Expose()
    password!: string;
}

export class SignupUserResponseDTO {
    @Expose()
    id!: number;
    @Expose()
    username!: string;
}