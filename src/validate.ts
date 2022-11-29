import {loginFormValues as loginValues} from './components/Login/login'
import {changePassFormType, profileFormType } from './components/Profile/Profile'
import { nor } from './types'


type loginErrType = {email : nor,password: nor} | void

export const loginValidator = ({email,password} : loginValues) : loginErrType  => {
    const errors  : any = {}

    if (!email) errors.email = 'Email is required'
    if (!email.includes('@')) errors.email = 'Email is not correct'
    if (!password) errors.password =  'Password is required'
    if (ValidateEmail(email)) errors.email = 'Email is not correct'
    return errors
}
export const ValidateEmail = (mail : string) => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        .test(mail)) return false
    return true
}

const isWordValid = (word : string) => {
    const res = /^[a-z0-9_\.]+$/.exec(word);
    return !!res;
}

export const profileValidator = ({userName} : profileFormType) => {
    const errors : any = {}
    if (!isWordValid(userName)) errors.userName = 'Name is not correct'
    if (userName.length <4) errors.userName = 'Name is too short'
    if (userName.length >12) errors.userName = 'Name is too long'
    return errors
}

export const changePasswordValidator = (values : changePassFormType) => {
    const errors : any = {}
    const checkPass = (word : string,name : string,message : string) => {
        if (!isWordValid(word)
            || !word
            || word.length>10
            || word.length<4
        ) {
            errors[name] = message
        }
    }

    checkPass(values.nextPassword,'nextPassword','New password is not correct')
    checkPass(values.repeatPassword,'repeatPassword','Passwords do not match')
    if (values.nextPassword!=values.repeatPassword && values.repeatPassword.length>0){
        errors.repeatPassword = 'Passwords do not match'
    }
    return errors
}
