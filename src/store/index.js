import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth";

//initial the global redux "state"
const store = configureStore({
    reducer: {
        auth: authReducer,
    },
});

export default store;