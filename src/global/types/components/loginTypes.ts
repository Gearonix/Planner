export type getOrCreateUserType = {
    email: string,
    password: string,
    isRegistration: boolean
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
    password: string
}
export type LoginProps = {
    isRegistration: boolean
}
