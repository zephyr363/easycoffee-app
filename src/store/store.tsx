import { configureStore } from "@reduxjs/toolkit";
import { userAPI } from "../services/user";
import { coffeeAPI } from "../services/coffee";
import userSlice from "./slices/user";
import DialogSlice from "./slices/dialog";

export const store = configureStore({
    reducer: {
        user: userSlice,
        dialogs: DialogSlice,
        [userAPI.reducerPath]: userAPI.reducer,
        [coffeeAPI.reducerPath]: coffeeAPI.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(userAPI.middleware)
            .concat(coffeeAPI.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch