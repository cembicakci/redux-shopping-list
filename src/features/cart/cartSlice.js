import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import cartItems from "../../cartItems";

const url = 'https://course-api.com/react-useReducer-cart-project';

export const getCartItems = createAsyncThunk('cart/getCartItems', () => {
    return fetch(url).then(res => res.json()).catch((err) => console.log(err))
})

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartItems: [],
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
        },
        calculateTotals: (state) => {
            let amount = 0;
            let total = 0;
            state.cartItems.forEach((item) => {
                amount += item.amount
                total += item.amount * item.price
            })

            state.amount = amount;
            state.total = total;
        }
    },
    extraReducers: {
        [getCartItems.pending]: (state) => {
            state.isLoading = true;
        },
        [getCartItems.fulfilled]: (state, action) => {
            console.log(action.payload)
            state.isLoading = false;
            state.cartItems = action.payload
        },
        [getCartItems.rejected]: (state) => {
            state.isLoading = false;
        }
    }

})

export const { clearCart, removeItem, increase, decrease, calculateTotals } = cartSlice.actions
export default cartSlice.reducer
