import {createSlice} from "@reduxjs/toolkit";


const initialState = {
    title: '',
    selectedOption: "today",
    technologyOptions: {
        "2D": true,
        "3D": true,
    },
    ageOptions: {
        0: true,
        16: true,
        17: true,
        18: true,
    }
};

const moviesFilterSlice = createSlice({
    name: 'moviesFilter',
    initialState,
    reducers: {
        changeSelectedTitle(state, action) {
            console.log(action.payload);
            state.title = action.payload;
        },
        changeSelectedOption(state, action) {
            state.selectedOption = action.payload;
        },
        changeSelectedTechnologies(state, action) {
            const {name, checked} = action.payload;
            state.technologyOptions = {
                ...state.technologyOptions,
                [name]: checked,
            }
        },
        changeSelectedAges(state, action) {
            const {name, checked} = action.payload;
            state.ageOptions = {
                ...state.ageOptions,
                [name]: checked,
            }
        },

    },
})

export const moviesFilterActions = moviesFilterSlice.actions;
export default moviesFilterSlice.reducer;