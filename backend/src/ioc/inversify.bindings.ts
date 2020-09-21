import { AsyncContainerModule } from "inversify";
import { Sequelize } from "sequelize/types";
import TYPES from "./types";

import { connectToDb } from "../db";

import { UserController } from "../controllers/UserController";

import { UserFactory } from "../entites/UserFactory";

import { UserRepository } from "../repository/UserRepository";

export const bindings = new AsyncContainerModule(async (bind) => {
    const sequelize = await connectToDb();

    bind<Sequelize>(TYPES.sequelize).toConstantValue(sequelize);

    // Entites
    const user = UserFactory(sequelize);
    bind<typeof user>(TYPES.User).toConstantValue(user);

    // Entites
    bind<UserRepository>(TYPES.UserRepository).to(UserRepository);

    // Controllers
    bind<UserController>(TYPES.UserController).to(UserController);
});