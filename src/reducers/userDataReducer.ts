import { createSlice, PayloadAction} from "@reduxjs/toolkit";
import {changeUserResponseType, loginResponseType, loginType} from "../global/types";
import ConnectToAPI from "../global/connectToAPI";
import {isError} from "../global/constants";
import {passwordFormType, profileFormWithID, setUserImageType } from "../components/Profile/profile";
import { randomizeColors } from "../global/tools";
import {createThunk} from "../global/tools";


const initialState : loginType= {
    user_id : null,
    email : null,
    password : null,
    userImage : null,
    userName : null
}





const userDataReducer = createSlice({
    name : 'userDataReducer',
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
    updateUserPassword,clearUserData} = userDataReducer.actions


type getOrCreateUserType = {
    email : string,
    password : string,
    isRegistration : boolean
}

export const getOrCreateUser = createThunk('GET_OR_CREATE_USER',
    async (data : getOrCreateUserType, {dispatch}) => {
    // @ts-ignore
    const callback = data.isRegistration ? ConnectToAPI.createUser : ConnectToAPI.loginUser

    const {data : userData} = await callback(data)
    if (isError(userData)) return userData.message
    dispatch(setUserValues(userData.data))
})


export const changeUserName = createThunk('CHANGE_USER_NAME',
    async (data : profileFormWithID, {dispatch}) => {
        const {data : userData} = await ConnectToAPI.changeUserData(data)
        if (isError(userData)) return
        dispatch(changeUserValues(userData.data))
})

export const changeUserPassword = createThunk('CHANGE_USER_PASSWORD',
    async (data : passwordFormType,{dispatch}) => {
        const {data : userData} = await ConnectToAPI.changeUserPassword(data)
        if (isError(userData)) return
        dispatch(updateUserPassword(userData.data.password))
    })


export const uploadFile = createThunk('UPLOAD_FILE',
    async ({file,name} : {file : any,name : string}) => {
        const formData = new FormData()
        formData.append(name, file)
        const {data: userData} = await ConnectToAPI.uploadFile({formData,name})
        if (isError(userData)) return console.log('upload failed')
        return userData.data
})


export const updateUserImage = createThunk('UPDATE_USER_IMAGE',
    async (data : setUserImageType,{dispatch}) => {
        const response = await ConnectToAPI.setUserImage(data)
        if (isError(response.data)) return
        dispatch(setUserImage(data.filename))
})


export const getAuth = createThunk('GET_AUTH',
    async (data : void,{dispatch}) => {

        const {data : response} = await ConnectToAPI.getAuth()
        if (isError(response)) return true
        if (!localStorage.getItem('defaultAvatarColor')) localStorage.setItem('defaultAvatarColor',randomizeColors())
        dispatch(setUserValues(response.data))
})

export const logoutUser = createThunk('LOGOUT_USER',
    async (data : void,{dispatch}) => {
    await ConnectToAPI.logoutUser()
    dispatch(clearUserData())
})


export default userDataReducer.reducer
