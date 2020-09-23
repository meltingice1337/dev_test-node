
import React, { FunctionComponent, useCallback, useEffect, useState } from "react";

import { NoteExternalModelDTO } from "@models/note.models";

import NoteService from "@services/NoteService";

const UserNotes: FunctionComponent = () => {
    const [userNotes, setUserNotes] = useState<NoteExternalModelDTO[]>([])

    const renderData = (): JSX.Element[] => {
        return userNotes.map((userNote, index) => (
            <tr key={`user-table-${index}`}>
                <th scope="row">{index + 1}</th>
                <td>{userNote.username}</td>
                <td>{userNote.note.data.title}</td>
                <td>{userNote.note.data.description}</td>
                <td>{userNote.note.updatedAt}</td>
            </tr>
        ));
    }

    const getNotes = useCallback(async () => {
        const response = await NoteService.getExternalNotes();
        if (response) {
            setUserNotes(response.data);
        }
    }, [setUserNotes]);

    useEffect(() => {
        getNotes();
    }, [getNotes])

    return (
        <table className="table">
            <thead className="thead-dark">
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Username</th>
                    <th scope="col">Note title</th>
                    <th scope="col">Note description</th>
                    <th scope="col">Note last updated</th>
                </tr>
            </thead>
            <tbody>
                {renderData()}
            </tbody>
        </table>

    )
}

export default UserNotes;