
import React, { FunctionComponent, useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import NoteService from '@services/NoteService';
import { NoteModel, NoteModelDTO } from '@models/note.models';

const OwnNote: FunctionComponent = () => {
    const { handleSubmit, register, setValue } = useForm();

    const [note, setNote] = useState<NoteModelDTO>();

    const getNote = useCallback(async () => {
        const resp = await NoteService.getNote();
        if (resp) {
            setValue('title', resp.data.data.title);
            setValue('description', resp.data.data.description);
            setNote(resp.data);
        }
    }, [setValue, setNote])

    useEffect(() => {
        getNote();
    }, [setValue, getNote])

    const onSubmit = async (data: NoteModel) => {
        const resp = await NoteService.saveNote(data);

        if (resp) {
            toast.success('Your note was saved !');
        }
    }

    return (
        <form className="d-flex flex-column flex-grow-1" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
                <label>Title</label>
                <input type="text" required className="form-control" name="title" placeholder="Your note title" ref={register()} />
            </div>

            <div className="form-group">
                <label>Note</label>
                <textarea rows={20} required className="form-control" name="description" placeholder="Enter your note description" ref={register()} />
            </div>
            {note && <p>Last edited at {note.updatedAt}</p>}
            <button type="submit" className="btn btn-primary btn-block mt-auto">Save</button>
        </form>
    )
}

export default OwnNote;