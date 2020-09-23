import axios, { AxiosPromise, AxiosResponse } from 'axios';

import { NoteModel, NoteModelDTO } from '@models/note.models';

const NoteService = {
    getNote: async (): Promise<AxiosResponse<NoteModelDTO>> => axios.get('/notes'),
    saveNote: async (note: NoteModel): Promise<AxiosResponse<NoteModel>> => axios.post('/notes', note),
}

export default NoteService;