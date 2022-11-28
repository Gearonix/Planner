import {formValues as loginValues} from './components/Login/login'
import { nor } from './types'


type loginErrType = {email : nor,password: nor} | void

export const loginValidator = ({email,password} : loginValues) : loginErrType  => {
    const errors  : any = {}

    if (!email) errors.email = 'Email is required'
    if (!email.includes('@')) errors.email = 'Email is not correct'
    if (!password) errors.password =  'Password is required'

    return errors
}
