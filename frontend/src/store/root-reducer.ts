import { Action, combineReducers } from 'redux';

import reducers from './reducers';

export interface DispatchAction<A> extends Action<A> {
    payload: any;
}

export const rootReducer = combineReducers({
    users: reducers.usersReducer
})

export type AppState = ReturnType<typeof rootReducer>;