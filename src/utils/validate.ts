import {nor} from "../types/appTypes";
import {loginFormValues as loginValues} from "../components/Login/others/loginTypes";
import {changePassFormType} from "../components/Profile/others/profileTypes";


type loginErrType = { email: nor, password: nor } | void

export const loginValidator = ({email, password}: loginValues): loginErrType => {
    const errors: any = {}
    if (!email.includes('@')) errors.email = 'Email is not correct'
    if (ValidateEmail(email)) errors.email = 'Email is not correct'
    if (!email) errors.email = 'Email is required'
    if (!password) errors.password = 'Password is required'
    return errors
}
export const ValidateEmail = (mail: string) => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) return false
    return true
}

const isWordValid = (word: string) => {
    const res = /^[a-z0-9_\.]+$/.exec(word);
    return !!res;
}

export const profileValidator = (value: string, matchValue: string) =>
    !isWordValid(value)
    || value.length < 4
    || value.length > 12
    || value === matchValue

export const changePasswordValidator = (values: changePassFormType) => {
    const errors: any = {}
    const checkPass = (word: string, name: string, message: string) => {
        if (!isWordValid(word)
            || !word
            || word.length > 10
            || word.length < 4
        ) {
            errors[name] = message
        }
    }

    checkPass(values.nextPassword, 'nextPassword', 'New password is not correct')
    checkPass(values.repeatPassword, 'repeatPassword', 'Passwords do not match')
    if (values.nextPassword !== values.repeatPassword && values.repeatPassword.length > 0) {
        errors.repeatPassword = 'Passwords do not match'
    }
    return errors
}


export const modalValidator = (values: any) => {
    const errors: any = {}
    if (!values.title) {
        errors.title = 'Title is required'
    }

    return errors
}

export function isFileImage(file: any) {
    const acceptedImageTypes = ['image/gif', 'image/jpeg', 'image/png'];

    return file && acceptedImageTypes.includes(file['type'])
}
