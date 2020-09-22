import React, { FunctionComponent, useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';

import { CreateUserModel } from "@models/user.models";

import UserService from "@services/UserService";
import { CreateUser } from "./CreateUser";

import { AppState } from "@store/root-reducer";
import userActions from "@store/actions/user.actions";
import { toast } from "react-toastify";

const Users: FunctionComponent = () => {
    const users = useSelector((store: AppState) => store.users);
    const dispatch = useDispatch();

    const [showCreateUser, setShowCreateUser] = useState(false);

    const getUsers = useCallback(async () => {
        const response = await UserService.getAllExternal();
        if (response) {
            dispatch(userActions.setUsers(response.data));
        }
    }, [])

    useEffect(() => {
        getUsers();
    }, [getUsers])

    const handleCreateUser = async (user: CreateUserModel) => {
        const response = await UserService.createUser(user);
        if (response) {
            toast.success('User created with success !');
            dispatch(userActions.addUser(response.data));
            setShowCreateUser(false);
        }
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