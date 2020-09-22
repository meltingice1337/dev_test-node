import { Sequelize, DataTypes, Model, ModelDefined, BuildOptions } from "sequelize";

import { IsString } from 'class-validator'
import { Expose } from "class-transformer";

export enum UserRole { External, Internal };

export interface UserAttributes {
    id: number;
    username: string;
    password: string;
    role: UserRole;
    createdById: number;
}

export interface UserModel extends Model<UserAttributes>, UserAttributes { }

export class User extends Model<UserModel, UserAttributes> { }

export type UserStatic = typeof Model & {
    new(values?: object, options?: BuildOptions): UserModel;
};

export function UserFactory(sequelize: Sequelize): UserStatic {
    const userSchema = <UserStatic>sequelize.define('users', {
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
        },
        createdById: {
            type: DataTypes.INTEGER,
            references: {
                model: 'users', // 'Movies' would also work
                key: 'id'
            }
        }
    });

    userSchema.hasMany(userSchema, {foreignKey: 'createdById'});
    userSchema.belongsTo(userSchema, { foreignKey: 'id' });
    return userSchema;
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

export class SigninUserDTO {
    @IsString()
    @Expose()
    username!: string;

    @IsString()
    @Expose()
    password!: string;
}

export class SigninUserResponseDTO {
    @Expose()
    username!: string;

    @Expose()
    id!: number;

    @Expose()
    role!: UserRole;
}

export class ExternalUserResponseDTO {
    @Expose()
    username!: string;

    @Expose()
    id!: number;
}