import { AsyncContainerModule, Container } from "inversify";
import { Sequelize } from "sequelize/types";
import TYPES from "./types";

import { connectToDb } from "../db";

import { UserController } from "../controllers/UserController";

import { UserFactory } from "../entites/UserEntity";

import { UserService } from "../services/UserService";
import { AuthService } from "../services/AuthService";

import { UserRepository } from "../repository/UserRepository";
import { AuthController } from "../controllers/AuthController";


export const containerFactory = async () => {

    let container = new Container();

    const sequelize = await connectToDb();
    container.bind<Sequelize>(TYPES.sequelize).toConstantValue(sequelize);

    // Controllers
    container.bind<UserController>(TYPES.UserController).to(UserController);
    container.bind<AuthController>(TYPES.AuthController).to(AuthController);

    // Entites
    const user = UserFactory(sequelize);
    container.bind<typeof user>(TYPES.User).toConstantValue(user);

    // Entites
    container.bind<UserRepository>(TYPES.UserRepository).to(UserRepository);

    // Services
    container.bind<UserService>(TYPES.UserService).to(UserService);
    container.bind<AuthService>(TYPES.AuthService).to(AuthService);

    return container;
}
