import React, { FunctionComponent, useCallback, useEffect, useState } from "react";

import { ExternalUserModel } from "@models/user.models";
import UserService from "@services/UserService";

const Users: FunctionComponent = () => {

    const [users, setUsers] = useState<ExternalUserModel[]>([])

    const getUsers = useCallback(async () => {
        const response = await UserService.getAllExternal();
        if (response) {
            setUsers(response.data)
        }
    }, [setUsers])

    useEffect(() => {
        getUsers();
    }, [getUsers])

    const renderData = (): JSX.Element[] => {
        return users.map((user, index) => (
            <tr key={`user-table-${index}`}>
                <th scope="row">{index}</th>
                <td>{user.id}</td>
                <td>{user.username}</td>
            </tr>
        ));
    }

    return (
        <>
            <button className="btn btn-success mb-2">Create internal user</button>
            <table className="table">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Id</th>
                        <th scope="col">Username</th>
                    </tr>
                </thead>
                <tbody>
                    {renderData()}
                </tbody>
            </table>
        </>
    )
}

export default Users; 