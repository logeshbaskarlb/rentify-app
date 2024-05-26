import rootSlice from "./rootSlice";
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";

const reducer = combineReducers({
    root : rootSlice
});
const store = configureStore({
    reducer
})
export default store;