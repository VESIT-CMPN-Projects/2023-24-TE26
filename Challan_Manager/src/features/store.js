import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "./Search/SearchSlice";

export const store = configureStore({
    reducer:{
        search: searchReducer
    }
})