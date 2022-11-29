import axios from 'axios'
import { loginFormValues } from './components/Login/login';
import {passwordFormType, profileFormType, setUserImageType} from "./components/Profile/Profile";


const instance = axios.create({
    baseURL: 'http://localhost:6868',
    withCredentials: true,

})


const API = {
    loginUser(data : loginFormValues){
        return instance.put('/user',data)
    },
    createUser(data : loginFormValues){
        return instance.post('/user',data)
    },
    changeUserData(data : profileFormType){
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
    }
}

export default API
