import { inject, injectable } from "inversify";

import { NoteDTO, NoteModel, NoteStatic, UserNoteDTO } from "../entites/NoteEntity";
import { plainToClass } from "class-transformer";

import TYPES from "../ioc/types";

import { UserAttributes, UserStatic } from "../entites/UserEntity";

@injectable()
export class NoteService {

    constructor(
        @inject(TYPES.Note) private readonly noteEntity: NoteStatic,
        @inject(TYPES.User) private readonly userEntity: UserStatic
    ) { }

    public async getOwnNote(user: UserAttributes): Promise<NoteModel | null> {
        return this.noteEntity.findOne({ where: { userId: user.id } });
    }

    public async getExternalNotes(user: UserAttributes): Promise<any> {
        const users = await this.userEntity.findAll({ where: { createdById: user.id }, include: this.noteEntity })
        const transformed = plainToClass(UserNoteDTO, users.map(u => u.get()), { strategy: 'excludeAll' });
        return transformed;
    }

    public async createNote(note: NoteDTO, user: UserAttributes): Promise<NoteModel> {
        const [entity] = await this.noteEntity.findOrCreate({ where: { userId: user.id }, defaults: { data: note, userId: user.id } });
        entity.update({ data: note });
        return entity;
    }
}