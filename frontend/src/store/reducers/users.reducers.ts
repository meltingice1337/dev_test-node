import { ExternalUserModel } from "@models/user.models";
import { Reducer, Action } from "redux";

import { ACTION_TYPES } from '../action-types';

import { DispatchAction } from "../root-reducer";

type ActionType = keyof typeof ACTION_TYPES.USERS;

const usersReducer: Reducer<ExternalUserModel[], DispatchAction<ActionType>> = (state = [], action) => {
    if (action.type === ACTION_TYPES.USERS.SET_USERS) {
        return [...action.payload];
    } else if (action.type === ACTION_TYPES.USERS.ADD_USER) {
        return [...state, action.payload];
    } else if (action.type === ACTION_TYPES.USERS.DELETE_USER) {
        const id = action.payload;
        const userIndex = state.findIndex(user => user.id === id);
        const newState = [...state];
        newState.splice(userIndex, 1);
        return [...newState];
    }
    return state;
}

export default usersReducer;