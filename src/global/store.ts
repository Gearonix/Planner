import {configureStore} from "@reduxjs/toolkit";
import userDataReducer from "../reducers/userDataReducer";
import tasksListReducer from "../reducers/tasksListReducer";

const store = configureStore({
    reducer : {
        userData : userDataReducer,
        taskLists : tasksListReducer
    }
})

//@ts-ignore
window.s = store.getState

export type StateType = ReturnType<typeof store.getState>

export type globalDispatch = typeof store.dispatch


export default store
