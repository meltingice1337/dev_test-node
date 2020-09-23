export interface NoteModel {
    description: string;
    title: string;
}

export interface NoteModelDTO {
    id: number;
    updatedAt: string;
    data: NoteModel;
}