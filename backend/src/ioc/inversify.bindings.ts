import { AsyncContainerModule } from "inversify";
import { Sequelize } from "sequelize/types";
import TYPES from "./types";

import { connectToDb } from "../db";

import { UserController } from "../controllers/UserController";

import { UserFactory } from "../entites/UserEntity";

import { UserService } from "../services/UserService";
import { AuthService } from "../services/AuthService";

import { UserRepository } from "../repository/UserRepository";
import { AuthController } from "../controllers/AuthController";

export const bindings = new AsyncContainerModule(async (bind) => {
    const sequelize = await connectToDb();

    bind<Sequelize>(TYPES.sequelize).toConstantValue(sequelize);

    // Entites
    const user = UserFactory(sequelize);
    bind<typeof user>(TYPES.User).toConstantValue(user);

    // Entites
    bind<UserRepository>(TYPES.UserRepository).to(UserRepository);

    // Services
    bind<UserService>(TYPES.UserService).to(UserService);
    bind<AuthService>(TYPES.AuthService).to(AuthService);

    // Controllers
    bind<UserController>(TYPES.UserController).to(UserController);
    bind<AuthController>(TYPES.AuthController).to(AuthController);
});