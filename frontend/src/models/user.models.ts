export interface ExternalUserModel {
    username: string;
    id: number;
    imageUrl: string;
}

export interface CreateUserModel {
    username: string;
    password: string;
}