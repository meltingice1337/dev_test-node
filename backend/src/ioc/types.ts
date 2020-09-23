import { types } from "util"

const TYPES = {
    sequelize: Symbol('sequelize'),

    // Controllers
    UserController: Symbol('UserController'),
    AuthController: Symbol('AuthController'),
    HealthCheckController: Symbol('HealthCheckController'),
    NoteController: Symbol('NoteController'),

    // Entities
    User: Symbol('User'),
    Note: Symbol('Note'),

    // Repositories
    UserRepository: Symbol('UserRepository'),
    NoteRepository: Symbol('NoteRepository'),

    // Services
    AuthService: Symbol('AuthService'),
    UserService: Symbol('UserService'),
    NoteService: Symbol('NoteService'),
    InstagramService: Symbol('InstagramService'),
}

export default TYPES;