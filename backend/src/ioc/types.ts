import { types } from "util"

const TYPES = {
    sequelize: Symbol('sequelize'),

    // Controllers
    UserController: Symbol('UserController'),

    // Entities
    User: Symbol('User'),

    // Repositories
    UserRepository: Symbol('UserRepository')

}

export default TYPES;