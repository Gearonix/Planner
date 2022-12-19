export type getOrCreateUserType = {
    email: string,
    password: string,
    isRegistration: boolean,
    rememberMe: boolean
}
export type loginResponseType = {
    _id: string,
    email: string,
    password: string,
    userName: string,
    userImage: string
}
export type loginFormValues = {
    email: string,
    password: string,
    rememberMe: boolean
}
export type LoginProps = {
    isRegistration: boolean
}
