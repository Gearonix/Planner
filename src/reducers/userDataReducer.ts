import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {loginType} from "../global/types/stateTypes";
import API from "../global/API";
import {isError} from "../global/constants";
import {createThunk, randomizeColors} from "../helpers/tools";
import {getOrCreateUserType, loginResponseType} from "../global/types/components/loginTypes";
import {passwordFormType, profileFormWithID, setUserImageType} from "../global/types/components/profileTypes";


const initialState: loginType = {
    user_id: null,
    email: null,
    password: null,
    userImage: null,
    userName: null
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
        changeUserValues(state, {payload}: PayloadAction<{ userName: string }>) {
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


export const getOrCreateUser = createThunk('GET_OR_CREATE_USER',
    async (data : getOrCreateUserType, {dispatch}) => {
    // @ts-ignore
        const callback = data.isRegistration ? API.createUser : API.loginUser

    const {data : userData} = await callback(data)
    if (isError(userData)) return userData.message
    dispatch(setUserValues(userData.data))
})


export const changeUserName = createThunk('CHANGE_USER_NAME',
    async (data : profileFormWithID, {dispatch}) => {
        const {data: userData} = await API.changeUserData(data)
        if (isError(userData)) return
        dispatch(changeUserValues(userData.data))
})

export const changeUserPassword = createThunk('CHANGE_USER_PASSWORD',
    async (data : passwordFormType,{dispatch}) => {
        const {data: userData} = await API.changeUserPassword(data)
        if (isError(userData)) return
        dispatch(updateUserPassword(userData.data.password))
    })


export const uploadFile = createThunk('UPLOAD_FILE',
    async ({file,name} : {file : any,name : string}) => {
        const formData = new FormData()
        formData.append(name, file)
        const {data: userData} = await API.uploadFile({formData, name})
        if (isError(userData)) return console.log('upload failed')
        return userData.data
})


export const updateUserImage = createThunk('UPDATE_USER_IMAGE',
    async (data : setUserImageType,{dispatch}) => {
        const response = await API.setUserImage(data)
        if (isError(response.data)) return
        dispatch(setUserImage(data.filename))
})


export const getAuth = createThunk('GET_AUTH',
    async (data : void,{dispatch}) => {

        const {data: response} = await API.getAuth()
        if (isError(response)) return true
        if (!localStorage.getItem('defaultAvatarColor')) localStorage.setItem('defaultAvatarColor',randomizeColors())
        dispatch(setUserValues(response.data))
})

export const logoutUser = createThunk('LOGOUT_USER',
    async (data : void,{dispatch}) => {
        await API.logoutUser()
        dispatch(clearUserData())
})


export default userDataReducer.reducer
