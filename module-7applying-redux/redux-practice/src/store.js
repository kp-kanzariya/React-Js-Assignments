import { configureStore } from "@reduxjs/toolkit";
import { counterReducer } from "./reducer";

export const storeData = configureStore({
    reducer:{
        xyz:counterReducer
    }
})

