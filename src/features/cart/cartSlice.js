import { createSlice } from "@reduxjs/toolkit";

import cartItems from "../../cartItems";

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartItems: cartItems,
        amount: 1,
        total: 0,
        isLoading: true
    },
    reducers: {
        clearCart: (state) => {
            state.cartItems = [];
        },
        removeItem: (state, action) => {
            const itemId = action.payload;
            state.cartItems = state.cartItems.filter((item) => item.id !== itemId)
        },
        increase: (state, action) => {
            console.log(action.payload)
            const cartItem = state.cartItems.find(item => item.id === action.payload.id)
            cartItem.amount = cartItem.amount + 1;
        },
        decrease: (state, action) => {
            const cartItem = state.cartItems.find(item => item.id === action.payload.id)
            cartItem.amount = cartItem.amount - 1;
        }

    }

})

export const { clearCart, removeItem, increase, decrease } = cartSlice.actions
export default cartSlice.reducer
