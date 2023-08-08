import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {CartItem} from "~/interfaces/models";
import {RootState} from "~/redux";

export interface CartState {
    cartItems: CartItem[];
}

const initialState: CartState = {
    cartItems: [],
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<CartItem>) => {
            const newItem = action.payload;
            const existingItem = state.cartItems.find(item => item.id === newItem.id);
            if (existingItem) {
                existingItem.quantity++;
            } else {
                state.cartItems.push(newItem);
            }
        },
        removeFromCart: (state, action: PayloadAction<number>) => {
            const itemId = action.payload;
            state.cartItems = state.cartItems.filter(item => item.id !== itemId);
        },
        clearCart: state => {
            state.cartItems = [];
        },
        incrementQuantity: (state, action: PayloadAction<number>) => {
            const itemId = action.payload;
            const item = state.cartItems.find(item => item.id === itemId);
            if (item) {
                item.quantity++;
            }
        },
        decrementQuantity: (state, action: PayloadAction<number>) => {
            const itemId = action.payload;
            const item = state.cartItems.find(item => item.id === itemId);
            if (item) {
                item.quantity--;

                if (item.quantity <= 0) {
                    state.cartItems = state.cartItems.filter(item => item.id !== itemId);
                }
            }
        },
    },
});

export const {
    addToCart,
    removeFromCart,
    clearCart,
    incrementQuantity,
    decrementQuantity,
} = cartSlice.actions;

export const selectTotalItems = (state: RootState) => {
    return state.cart.cartItems.length;
};

export const selectTotalAmount = (state: RootState) => {
    return state.cart.cartItems.reduce((index, item) => {
        return item.price * item.quantity
    }, 0);
};

export default cartSlice.reducer;
