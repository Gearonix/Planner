import axios from 'axios'
import {getUserDaysT, taskToServerT} from "../components/Main/others/mainTypes";
import {loginFormValues} from "../components/Login/others/loginTypes";
import {passwordFormType, profileFormWithID, setUserImageType} from "../components/Profile/others/profileTypes";


const instance = axios.create({
    baseURL: 'http://localhost:6868',
    withCredentials: true,

})


const API = {
    loginUser(data: loginFormValues) {
        return instance.put('/user/login', data)
    },
    createUser(data: loginFormValues) {
        return instance.post('/user/signup', data)
    },
    changeUserData(data: profileFormWithID) {
        return instance.put('/user/change/username', data)
    },
    uploadFile(data: { formData: any, name: string }) {
        return instance.put(`/user/upload/image?dir=${data.name}`, data.formData)
    },
    setUserImage(data: setUserImageType) {
        return instance.put('/user/set/image', data)
    },
    changeUserPassword(data: passwordFormType) {
        return instance.put('/user/change/password', data)
    },
    getAuth() {
        return instance.get('/cookie/auth')
    },
    logoutUser() {
        return instance.delete('/cookie/clear')
    },
    getUserDays({user_id, selectedDate}: getUserDaysT) {
        return instance.put(`/planner/month`, {user_id, selectedDate})
    },
    createTask(data: taskToServerT) {
        return instance.post('/planner/task/create', data)
    },
    deleteTask(task_id: string) {
        return instance.delete('/planner/task/delete', {data: {task_id}})
    },
    updateTask(data: taskToServerT) {
        return instance.put('/planner/task/update', data)
    }
}


export default API
