import { Sequelize, DataTypes, Model, ModelDefined, BuildOptions } from "sequelize";

import { IsString } from 'class-validator'
import { Expose, Type } from "class-transformer";

export enum UserRole { External, Internal };

export interface UserAttributes {
    id: number;
    username: string;
    password: string;
    role: UserRole;
    imageUrl: string | null;
    createdById: number;
}

export interface UserModel extends Model<UserAttributes>, UserAttributes { }

export class User extends Model<UserModel, UserAttributes> { }

export type UserStatic = typeof Model & {
    new(values?: object, options?: BuildOptions): UserModel;
};

export function UserFactory(sequelize: Sequelize) {
    const User = <UserStatic>sequelize.define('users', {
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
        imageUrl: DataTypes.STRING,
        role: {
            type: DataTypes.NUMBER,
            defaultValue: 0
        },
        createdById: {
            type: DataTypes.INTEGER,
            references: {
                model: 'users',
                key: 'id'
            }
        }
    });

    User.hasMany(User, { foreignKey: 'createdById' });
    User.belongsTo(User, { foreignKey: 'id', as: 'creator' });

    const associate = (models: any) => {
        User.hasOne(models.notes, { foreignKey: 'userId', onDelete: 'CASCADE', hooks: true });
    }

    return [User, associate];
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

    @Expose()
    imageUrl!: string;

    @Expose()
    @Type(() => SigninUserCreatorResponseDTO)
    creator!: SigninUserCreatorResponseDTO;
}

export class SigninUserCreatorResponseDTO {
    @Expose()
    username!: string;

    @Expose()
    imageUrl!: string;
}

export class ExternalUserResponseDTO {
    @Expose()
    username!: string;

    @Expose()
    id!: number;

    @Expose()
    imageUrl!: string;
}