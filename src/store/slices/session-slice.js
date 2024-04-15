import {createSlice} from "@reduxjs/toolkit";
import dateHelpers from "../../utlis/dateHelpers";


const initialState = {
    sessions: []
};

const sessionSlice = createSlice({
    name: 'session',
    initialState,
    reducers: {
        setSessions(state, action) {
            state.sessions = action.payload;
        }
    },
})

const filterDates = {
    "today": {
        from: addDaysToDate(Date.now(), -1),
        to: addDaysToDate(Date.now(), +1),
    },
    "tomorrow": {
        from: addDaysToDate(Date.now(), 0),
        to: addDaysToDate(Date.now(), +2),
    },
    "week": {
        from: addDaysToDate(Date.now(), -1),
        to: addDaysToDate(Date.now(), +6),
    },
    "month": {
        from: addDaysToDate(Date.now(), -1),
        to: addDaysToDate(Date.now(), +30),
    }
}

function addDaysToDate(date, days) {
    let result = new Date(date);
    result.setDate(result.getDate() + days);
    return dateHelpers.dateToISOFormat(result);
}

export const scheduledSessionsDecorator = (sessions,filterOptions) => {
    const sessionsCopy = {};

    const dates = sessions
        .map(s => s.date)
        .filter(date => {
            return  date > filterDates[filterOptions.selectedOption].from &&
                date < filterDates[filterOptions.selectedOption].to
        })
        .sort();
    dates.forEach(date => {

        sessionsCopy[date] = {};
        const technologies = Object.keys(filterOptions.technologyOptions)
            .filter(key => filterOptions.technologyOptions[key])
            .map(key => key.toString());


        technologies.forEach(technology => {

            sessions
                .filter(s => s.date === date)
                .filter(s => filterOptions.title ? s.movie.title.toLowerCase().includes(filterOptions.title.toLowerCase()) : true)
                .filter(s => {
                    return Object.keys(filterOptions.ageOptions).filter(key => filterOptions.ageOptions[key]).includes(s.movie.age.toString())
                })
                .forEach(session => {
                    if (!sessionsCopy[date][session.movie.id]) {
                        sessionsCopy[date][session.movie.id] = {};
                    }

                    if (!sessionsCopy[date][session.movie.id][technology]) sessionsCopy[date][session.movie.id][technology] = [];

                    if (session.technology === technology) sessionsCopy[date][session.movie.id][technology].push(session);
                });
        });

    });

    const updatedSessionsCopy = {};

    Object.keys(sessionsCopy).forEach(key => {
        updatedSessionsCopy[key] = {};
        Object.keys(sessionsCopy[key]).forEach(technologyKey => {
            updatedSessionsCopy[key][technologyKey] = {};
            Object.keys(sessionsCopy[key][technologyKey]).forEach(filmKey => {
                if (sessionsCopy[key][technologyKey][filmKey].length !== 0) {
                    updatedSessionsCopy[key][technologyKey][filmKey] = sessionsCopy[key][technologyKey][filmKey];
                }
            });
            if (Object.keys(updatedSessionsCopy[key][technologyKey]).length === 0) {
                delete updatedSessionsCopy[key][technologyKey];
            }
        });
        if (Object.keys(updatedSessionsCopy[key]).length === 0) {
            delete updatedSessionsCopy[key];
        }
    });

    return updatedSessionsCopy;
}


export const sessionActions = sessionSlice.actions;
export default sessionSlice.reducer;