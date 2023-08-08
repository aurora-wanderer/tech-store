import {configureStore} from "@reduxjs/toolkit";
import {setupListeners} from "@reduxjs/toolkit/dist/query";
import {productApi} from "~/redux/services/productApi";
import cartReducer from "~/redux/reducer/cartReducer";
import {categoryApi} from "~/redux/services/categoryApi";

export const store = configureStore({
    reducer: {
        "cart": cartReducer,
        [productApi.reducerPath]: productApi.reducer,
        [categoryApi.reducerPath]: categoryApi.reducer
    },
    devTools: process.env.NODE_ENV !== "production",
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({}).concat([productApi.middleware, categoryApi.middleware]),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
