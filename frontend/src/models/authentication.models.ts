export interface LoginUserModel {
    username: string;
    password: string;
}

export enum UserRoleModel { External, Internal };

export interface UserModel {
    username: string;
    id: number;
    role: UserRoleModel;
    imageUrl: string;

    creator: {
        username: string;
        imageUrl: string;
    }
}
