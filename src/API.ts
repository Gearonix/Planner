import axios from 'axios'


const instance = axios.create({
    baseURL: 'http://localhost:6868',
    withCredentials: true

})


export type userHttpType = {
    email : string,
    password: string
}

const API = {
    loginUser(data : userHttpType){
        return instance.put('/user',data)
    },
    createUser(data : userHttpType){
        return instance.post('/user',data)
    }
}

export default API
