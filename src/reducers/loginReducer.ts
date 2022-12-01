import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {changeUserResponseType, loginResponseType, loginType} from "../types";
import API from "../API";
import {isError, STATUS} from "../constants";
import {passwordFormType, profileFormWithID, setUserImageType } from "../components/Profile/Profile";
import { randomizeColors } from "../tools";


const initialState : loginType= {
    user_id : null,
    email : null,
    password : null,
    userImage : null,
    userName : null
}





const loginReducer = createSlice({
    name : 'loginReducer',
    initialState,
    reducers: {
        setUserValues(state, {payload} : PayloadAction<loginResponseType>){
            state.password = payload.password
            state.email = payload.email
            state.user_id = payload._id
            state.userName = payload.userName
            state.userImage = payload.userImage
        },
        changeUserValues(state,{payload} : PayloadAction<changeUserResponseType>){
            state.userName = payload.userName
        },
        setUserImage(state,{payload} :PayloadAction<string>){
            state.userImage = payload
        },
        updateUserPassword(state,{payload} : PayloadAction<string>){
            state.password = payload
        },
        clearUserData(state,{payload} : PayloadAction<void>){
            return initialState
        }
    }
})


const {setUserValues,changeUserValues,setUserImage,
    updateUserPassword,clearUserData} = loginReducer.actions


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
    if (isError(userData)) return userData.message
    dispatch(setUserValues(userData.data))
})


export const changeUserName = createAsyncThunk('CHANGE_USER_NAME',
    async (data : profileFormWithID, {dispatch}) => {
        const {data : userData} = await API.changeUserData(data)
        if (isError(userData)) return
        dispatch(changeUserValues(userData.data))
})

export const changeUserPassword = createAsyncThunk('CHANGE_USER_PASSWORD',
    async (data : passwordFormType,{dispatch}) => {
        const {data : userData} = await API.changeUserPassword(data)
        if (isError(userData)) return
        dispatch(updateUserPassword(userData.data.password))
    })

export const uploadFile = createAsyncThunk('UPLOAD_FILE',
    async (file : any,{dispatch}) => {
        const formData = new FormData()
        formData.append('avatar', file)
        const {data: userData} = await API.uploadFile(formData)
        if (isError(userData)){
            console.log('Upload failed.')
            return
        }
        const filename = userData.data
        dispatch(setUserImage(filename))
        return filename
    })



export const updateUserImage = createAsyncThunk('UPDATE_USER_IMAGE',
    async (data : setUserImageType,{dispatch}) => {
        const response = await API.setUserImage(data)
        if (isError(response.data)) return
})


export const getAuth = createAsyncThunk('GET_AUTH',
    async (data : void,{dispatch}) => {

        const {data : response} = await API.getAuth()
        if (isError(response)) return true
        if (!localStorage.getItem('defaultAvatarColor')) localStorage.setItem('defaultAvatarColor',randomizeColors())
        dispatch(setUserValues(response.data))
})

export const logoutUser = createAsyncThunk('LOGOUT_USER',
    async (data : void,{dispatch}) => {
    await API.logoutUser()
    dispatch(clearUserData())
})


export default loginReducer.reducer
