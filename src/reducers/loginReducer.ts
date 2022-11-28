import {createSlice} from "@reduxjs/toolkit";
import { loginType } from "../types";


const initialState : loginType= {
    user_id : null
}





const login = createSlice({
    name : 'login',
    initialState,
    reducers: {

    }
})



export default login.reducer
