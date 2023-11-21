import { Action, AnyAction, Dispatch, MiddlewareAPI, combineReducers, configureStore } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistReducer, persistStore } from "redux-persist";

import authSlice from "./context/authSlice";
import userSlice from "./context/userSlice";
import postSlice  from "./context/postSlice";


const rootReducer = combineReducers({
 auth : authSlice,
 user : userSlice,
 post : postSlice,
})

const persistConfig  = {
  key: 'root-store',
  storage : AsyncStorage,
  whitelist : ["auth, user", "post"]
}


export const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer : persistedReducer as unknown as typeof rootReducer,
})

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = Action | ((dispatch: AppDispatch, getState: () => RootState) => ReturnType);
// Redux Middleware
export interface ReduxMiddleware<
  S = any, // type of the state supported by this middleware.
  D extends Dispatch = Dispatch, // type of the dispatch supported by this middleware.
  A extends Action = AnyAction, // type of the action(s) supported by this middleware, inferred from actions passed to applyMiddleware
  DispatchExt = {} // optional override return behavior of dispatch
> {
  (api: MiddlewareAPI<D, S>): (next: D) => (action: A) => A | DispatchExt;
}
