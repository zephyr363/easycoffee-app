import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface AppDialogState {
    isLoginDialogOpen: boolean
}
const AppDialogiInitialState: AppDialogState = {
    isLoginDialogOpen: false
}
const dialogSlice = createSlice({
    name: 'dialogs',
    initialState: AppDialogiInitialState,
    reducers: {
        toggleLoginDialolg: (state, action: PayloadAction<boolean>) => {
            state.isLoginDialogOpen = action.payload
        }
    } 
})

export const {toggleLoginDialolg} = dialogSlice.actions;
export default dialogSlice.reducer;