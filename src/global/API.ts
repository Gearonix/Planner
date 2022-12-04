import axios from 'axios'
import { loginFormValues } from '../components/Login/login';
import {passwordFormType, profileFormWithID, setUserImageType} from "../components/Profile/profile";
import {setDaysFormT} from "../components/Main/main";


const instance = axios.create({
    baseURL: 'http://localhost:6868',
    withCredentials: true,

})


const API = {
    loginUser(data : loginFormValues){
        return instance.put('/user/login',data)
    },
    createUser(data : loginFormValues){
        return instance.post('/user/signup',data)
    },
    changeUserData(data : profileFormWithID){
        return instance.put('/user/change/username',data)
    },
    uploadFile(data : any){
        return instance.put('/user/upload/image',data)
    },
    setUserImage(data : setUserImageType){
        return instance.put('/user/set/image',data)
    },
    changeUserPassword(data : passwordFormType){
        return instance.put('/user/change/password',data)
    },
    getAuth(){
        return instance.get('/cookie/auth')
    },
    logoutUser(){
        return instance.delete('/cookie/clear')
    },
    getUserDays({user_id,fulldate} : setDaysFormT){
        return instance.get(`/planner/month?user_id=${user_id}&fulldate=${fulldate}`)
    }
}



export default API
