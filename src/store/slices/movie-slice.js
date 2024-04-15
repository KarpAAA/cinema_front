import {createSelector, createSlice} from "@reduxjs/toolkit";
import dateHelpers from "../../utlis/dateHelpers";



const initialState = {
    movies: []
};
const movieSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {
        setMovies(state, action){
          state.movies = action.payload;
        },
    },
})


export const getMoviesFromBackend = () => {
    return async (dispatcher) => {

        const res = await fetch('http://localhost:3000/movies', {
            method: 'GET'
        });

        const movies = await res.json();
        dispatcher(movieActions.setMovies(movies));
    }
}
export const selectMovies = state => state.movies.movies;

export const selectMovieById = createSelector(
    [selectMovies, (movies, id) => id],

    (movies, id) => {
        return movies.find(movie => movie.id == id);
    }
);

export const selectSoonMovies = createSelector(
    selectMovies,

    movies => {
        const filmsSoon = {};

        movies.forEach(movie => {
            const date = new Date(movie.dateTime);
            const formatDate = `${date.getDate()}, ${getMonthName(date.getMonth())}`


            if (!filmsSoon[formatDate]) filmsSoon[formatDate] = [];

            if(!dateHelpers.isPastDateObject(date)){
                filmsSoon[formatDate].push(movie);
            }

        })

        Object.keys(filmsSoon).forEach(key => {
            if(filmsSoon[key].length === 0) delete filmsSoon[key];
        })
        const dates = Object.keys(filmsSoon).sort();
        const sortedSessions = {};
        dates.forEach(date => {
            sortedSessions[date] = filmsSoon[date];
        });

        return sortedSessions;
    }
);

export const selectNowMovies = createSelector(
    selectMovies,
    movies => {
        const filmsNow = [];

        movies.forEach(movie => {
            const date = new Date(movie.dateTime);

            if(dateHelpers.isPastDateObject(date)){
                filmsNow.push(movie);
            }
        })
        return filmsNow;
    }
);


export const movieActions = movieSlice.actions;
export default movieSlice.reducer;


function getMonthName(monthIndex) {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return months[monthIndex];
}




