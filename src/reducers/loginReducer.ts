import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {loginResponseType, loginType } from "../types";
import API, { userHttpType } from "../API";
import {STATUS} from "../constants";


const initialState : loginType= {
    user_id : null,
    email : null,
    password : null
}





const loginReducer = createSlice({
    name : 'loginReducer',
    initialState,
    reducers: {
        setUserValues(state, {payload} : PayloadAction<loginResponseType>){
            state.password = payload.password
            state.email = payload.email
            state.user_id = payload._id
        }
    }
})


const {setUserValues} = loginReducer.actions


type getOrCreateUserType = {
    email : string,
    password : string,
    isRegistration : boolean
}

export const getOrCreateUser = createAsyncThunk('GET_OR_CREATE_USER',
    async (data : getOrCreateUserType, {dispatch}) => {
    // @ts-ignore
    const callback = data.isRegistration ? API.createUser : API.loginUser

    const {data : userData} = await callback(data)
    console.log(userData)
    if (userData.status==STATUS.serverError) return userData.message
    dispatch(setUserValues(userData.data))
})



export default loginReducer.reducer
