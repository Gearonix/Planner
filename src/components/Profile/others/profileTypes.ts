export type userImageProps = {
    size: number,
    fontSize: number,
    handler: Function
}
export type passwordFormType = {
    nextPassword: string,
    repeatPassword: string,
    user_id: string
}
export type changePassFormType = {
    nextPassword: string,
    repeatPassword: string
}
export type profileFormWithID = {
    userName: string,
    user_id: string
}
export type setUserImageType = {
    user_id: string,
    filename: string
}
