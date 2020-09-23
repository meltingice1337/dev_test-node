import { Sequelize, DataTypes, Model, ModelDefined, BuildOptions } from "sequelize";

import { IsString } from 'class-validator'
import { Expose, Type } from "class-transformer";
import { UserFactory } from "./UserEntity";

export interface NoteData {
    description: string;
    title: string;
}

export interface NotesAttributes {
    data: NoteData;
    userId: number;
}

export interface NoteModel extends Model<NotesAttributes>, NotesAttributes { }

export class Note extends Model<NoteModel, NotesAttributes> { }

export type NoteStatic = typeof Model & {
    new(values?: object, options?: BuildOptions): NoteModel;
};

export function NoteFactory(sequelize: Sequelize) {
    const Note = <NoteStatic>sequelize.define('notes', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        data: DataTypes.JSONB,
        userId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'users',
                key: 'id'
            }
        }
    });

    const associate = (models: any) => {
        Note.belongsTo(models.users)
    }

    return [Note, associate];
}


export class NoteDTO {
    @IsString()
    @Expose()
    description!: string;

    @Expose()
    @IsString()
    title!: string;
}

export class UserNoteDTO {
    @Expose()
    username!: string;

    @Expose()
    id!: number;

    @Expose()
    @Type(() => UserNoteExDTO)
    note!: UserNoteExDTO;
}

export class UserNoteExDTO {
    @Type(() => NoteDTO)
    @Expose()
    data!: NoteDTO;

    @Expose()
    id!: number;

    @Expose()
    updatedAt!: string;
}