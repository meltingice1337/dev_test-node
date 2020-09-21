import { types } from "util"

const TYPES = {
    sequelize: Symbol('sequelize'),

    // Controllers
    UserController: Symbol('UserController'),
    AuthController: Symbol('AuthController'),

    // Entities
    User: Symbol('User'),

    // Repositories
    UserRepository: Symbol('UserRepository'),

    // Services
    AuthService: Symbol('AuthService'),
    UserService: Symbol('UserService'),
}

export default TYPES;