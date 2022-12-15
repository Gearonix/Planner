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

export type DispatchType = typeof store.dispatch



export default store
