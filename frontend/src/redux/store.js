import { configureStore } from "@reduxjs/toolkit";

import { setupListeners } from "@reduxjs/toolkit/query/react";
import { apiSlice } from "./api/apiSlice";
import authReducer from "./features/auth/authSlice.js";

const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true,
});

setupListeners(store.dispatch);
export default store;

/*
The Redux Store is like a big brain or central data warehouse that holds all the app’s state (data) in one place.

Imagine you're building an app like Amazon:
User logs in ✅
Cart has 3 items 🛒
Dark mode is on 🌙

All this info (user, cart, UI settings) is stored in the Redux store, not spread out across different components. This way, any component can access it if needed.

*/