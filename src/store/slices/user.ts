import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { UserI } from "../../types/user";

interface UserSliceI {
    user: UserI | null;
}

const UserSliceState: UserSliceI = {
    user: null,
};

const userSlice = createSlice({
    name: "user",
    initialState: UserSliceState,
    reducers: {
        setUser(state, action: PayloadAction<UserI | null>) {
            state.user = action.payload;
        },
    },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;