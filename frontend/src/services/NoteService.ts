import axios, { AxiosPromise, AxiosResponse } from 'axios';

import { NoteExternalModelDTO, NoteModel, NoteModelDTO } from '@models/note.models';

const NoteService = {
    getExternalNotes: async (): Promise<AxiosResponse<NoteExternalModelDTO[]>> => axios.get('/notes'),
    getNote: async (): Promise<AxiosResponse<NoteModelDTO>> => axios.get('/notes'),
    saveNote: async (note: NoteModel): Promise<AxiosResponse<NoteModel>> => axios.post('/notes', note),
}

export default NoteService;