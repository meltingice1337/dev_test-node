import { Request } from "express";
import { inject } from "inversify";
import { controller, httpGet, httpPost, request } from "inversify-express-utils";

import TYPES from "../ioc/types";

import { NoteService } from "../services/NoteService";

import { UserAttributes, UserRole } from "../entites/UserEntity";
import { NoteDTO } from "../entites/NoteEntity";

import { authenticated } from "../middlewares/authenticated.middleware";
import { validationMiddleware } from "../middlewares/validation.middleware";

import { HttpException } from "../exceptions/HttpException";

@controller("/notes", authenticated(UserRole.External))
export class NoteController {

    constructor(
        @inject(TYPES.NoteService) private readonly noteService: NoteService
    ) { }

    @httpGet('/')
    public async list(@request() request: Request) {
        const user = request.locals as UserAttributes;
        console.log({ role: user.role })
        if (user.role === UserRole.External) {
            return this.noteService.getOwnNote(user);
        } else {
            return this.noteService.getExternalNotes(user);
        }
    }

    @httpPost('/', validationMiddleware(NoteDTO), authenticated(UserRole.External, false))
    public async create(@request() request: Request) {
        const user = request.locals as UserAttributes;
        const note = await this.noteService.createNote(request.body, user);
        if (!note) {
            throw new HttpException(404, 'No note found');
        }
        return note;
    }
}