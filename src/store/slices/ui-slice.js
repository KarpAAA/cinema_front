import {createSlice} from "@reduxjs/toolkit";


const initialState = {
    isModalWindowOpen: false,
    isLogInSelected: true,

};
const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        changeModalWindowState(state, action) {
            state.isModalWindowOpen = action.payload;
        },
        changeModalContent(state, action) {
            state.isLogInSelected = action.payload;
        }
    },
})

export const uiActions = uiSlice.actions;
export default uiSlice.reducer;