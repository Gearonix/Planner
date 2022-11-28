import {configureStore} from "@reduxjs/toolkit";
import loginReducer from "./reducers/loginReducer";

const store = configureStore({
    reducer : {
        login : loginReducer
    }
})

export type StateType = ReturnType<typeof store.getState>

export type globalDispatch = ReturnType<typeof store.dispatch>


export default store
