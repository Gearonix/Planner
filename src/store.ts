import {configureStore} from "@reduxjs/toolkit";
import loginReducer from "./reducers/loginReducer";

const store = configureStore({
    reducer : {
        userData : loginReducer
    }
})

//@ts-ignore
window.s = store.getState

export type StateType = ReturnType<typeof store.getState>

export type globalDispatch = typeof store.dispatch


export default store
