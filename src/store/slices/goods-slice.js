import {createSlice} from "@reduxjs/toolkit";
import {movieActions} from "./movie-slice";


const initialState = {
    goods: []
};
const goodsSlice = createSlice({
    name: 'goods',
    initialState,
    reducers: {
        setGoods(state, action){
            state.goods = [...action.payload];
        }
    },
})

export const goodsActions = goodsSlice.actions;

export const getGoodsFromBackend = () => {
    return async (dispatcher) => {

        const res = await fetch('http://localhost:3000/goods', {
            method: 'GET'
        });

        const goods = await res.json();
        dispatcher(goodsActions.setGoods(goods));
    }
}
export default goodsSlice.reducer;