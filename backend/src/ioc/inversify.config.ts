import { AsyncContainerModule, Container } from "inversify";
import { Model, Sequelize } from "sequelize/types";
import TYPES from "./types";

import { connectToDb } from "../db";

import { UserFactory } from "../entites/UserEntity";
import { NoteFactory } from "../entites/NoteEntity";
import { initializeFactories } from "../entites";

import { UserService } from "../services/UserService";
import { AuthService } from "../services/AuthService";
import { NoteService } from "../services/NoteService";

import { UserRepository } from "../repository/UserRepository";

import { UserController } from "../controllers/UserController";
import { AuthController } from "../controllers/AuthController";
import { HealthCheckController } from "../controllers/HealthCheckController";
import { NoteController } from "../controllers/NoteController";

export const containerFactory = async () => {

    let container = new Container();

    const sequelize = await connectToDb();
    container.bind<Sequelize>(TYPES.sequelize).toConstantValue(sequelize);

    // Controllers
    container.bind<UserController>(TYPES.UserController).to(UserController);
    container.bind<AuthController>(TYPES.AuthController).to(AuthController);
    container.bind<HealthCheckController>(TYPES.HealthCheckController).to(HealthCheckController);
    container.bind<NoteController>(TYPES.NoteController).to(NoteController);

    // Entites
    const entityFactory = initializeFactories(sequelize)
    container.bind<Model>(TYPES.User).toConstantValue(entityFactory.users);
    container.bind<Model>(TYPES.Note).toConstantValue(entityFactory.notes);

    // Entites
    container.bind<UserRepository>(TYPES.UserRepository).to(UserRepository);

    // Services
    container.bind<UserService>(TYPES.UserService).to(UserService);
    container.bind<AuthService>(TYPES.AuthService).to(AuthService);
    container.bind<NoteService>(TYPES.NoteService).to(NoteService);

    return container;
}
