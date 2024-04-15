import { configureStore } from '@reduxjs/toolkit'
import uiSlice from "./slices/ui-slice";
import movieSlice from "./slices/movie-slice";
import moviesFilterSice from "./slices/movies-filter-slice";
import userSlice from "./slices/user-slice";
import userCartSlice from "./slices/user-cart-slice";
import goodsSlice from "./slices/goods-slice";
import sessionSlice from "./slices/session-slice";
import {api} from "./api";
import {setupListeners} from "@reduxjs/toolkit/query";

export const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
        "ui": uiSlice,
        "movies": movieSlice,
        "moviesFilter": moviesFilterSice,
        'user': userSlice,
        'cart': userCartSlice,
        'goods': goodsSlice,
        'sessions': sessionSlice,
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware),
})

setupListeners(store.dispatch)

