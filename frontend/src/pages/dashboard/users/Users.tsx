import React, { FunctionComponent, useCallback, useEffect, useState } from "react";

import { CreateUserModel, ExternalUserModel } from "@models/user.models";
import UserService from "@services/UserService";
import { CreateUser } from "./CreateUser";

const Users: FunctionComponent = () => {
    const [users, setUsers] = useState<ExternalUserModel[]>([])
    const [showCreateUser, setShowCreateUser] = useState(false);

    const getUsers = useCallback(async () => {
        const response = await UserService.getAllExternal();
        if (response) {
            setUsers(response.data)
        }
    }, [setUsers])

    useEffect(() => {
        getUsers();
    }, [getUsers])

    const handleCreateUser = (user: CreateUserModel) => void {

    }

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
            <button className="btn btn-success mb-2" onClick={() => setShowCreateUser(true)}>Create external user</button>
            <CreateUser visible={showCreateUser} onClose={() => setShowCreateUser(false)} onCreateUser={handleCreateUser} />
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