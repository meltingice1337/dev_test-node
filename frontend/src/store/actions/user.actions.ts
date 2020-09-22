import { ExternalUserModel } from "@models/user.models";
import { ReducerAction } from "react";
import { ACTION_TYPES } from "../action-types";

const setUsers = (users: ExternalUserModel[]) => ({
    type: ACTION_TYPES.USERS.SET_USERS,
    payload: users
});

const addUser = (user: ExternalUserModel) => ({
    type: ACTION_TYPES.USERS.ADD_USER,
    payload: user
});

const deleteUser = (userId: number) => ({
    type: ACTION_TYPES.USERS.DELETE_USER,
    paylad: userId
});


export default {
    setUsers,
    addUser,
    deleteUser
}