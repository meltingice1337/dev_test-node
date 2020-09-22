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

export default {
    setUsers,
    addUser
}