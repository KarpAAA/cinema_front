import {createSlice} from "@reduxjs/toolkit";


const initialState = {
    goodToAmount: {},
    selectedSeats: []
};
const userCartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        useCart(state, action) {
            const goods = action.payload;
            state.goodToAmount = goods.reduce((acc, curr) => {
                acc[curr.id] = 0;
                return acc;
            }, {});
        },
        selectSeat(state, action) {
            state.selectedSeats.push({...action.payload});
        },
        unselectSeat(state, action) {
            const {row, seat} = action.payload;
            console.log({row, seat});
            state.selectedSeats = state.selectedSeats.filter(s => !(s.row === row && s.seat === seat));
        },
        addGoodToCard(state, action) {

            const {elementId, amount} = action.payload;

            if (state.goodToAmount[elementId] + amount >= 0) {
                state.goodToAmount[elementId] += amount;
            }

        },
        clearCart(state) {
            Object.keys(initialState).forEach(key => state[key] = initialState[key]);
        }
    },

})

export const handlePurchase = (purchaseInfo) => async (dispatcher) => {

    console.log(purchaseInfo);
    await fetch('http://localhost:3000/operations', {
        method: 'POST',
        headers: {"Content-Type": 'application/json'},
        body: JSON.stringify(purchaseInfo)
    });

}
export const cartActions = userCartSlice.actions;
export default userCartSlice.reducer;