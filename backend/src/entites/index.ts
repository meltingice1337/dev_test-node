
import { create } from 'domain';
import { access } from 'fs';
import { Sequelize } from 'sequelize';
import { eq } from 'sequelize/types/lib/operators';

import { NoteFactory } from './NoteEntity';
import { UserFactory } from './UserEntity';


const factories = [NoteFactory, UserFactory];

export const initializeFactories = (sequlize: Sequelize) => {
    const created = factories.map(factory => factory(sequlize));
    const models: any = created.map(c => c[0]).reduce((acc, model) => ({ ...acc, [model.name]: model }), {});
    const associationFunctions = created.map(created => created[1]);
    associationFunctions.forEach((fn: any) => fn(models))
    return models;
}