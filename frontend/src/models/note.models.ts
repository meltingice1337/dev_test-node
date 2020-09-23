export interface NoteModel {
    description: string;
    title: string;
}

export interface NoteModelDTO {
    id: number;
    updatedAt: string;
    data: NoteModel;
}

export interface NoteExternalModelDTO {
    username: string;
    id: number;
    note: NoteModelDTO;
}