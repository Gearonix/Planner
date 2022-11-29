
export type nor = null | string

export type loginType = {
    user_id : nor,
    email : nor,
    password: nor,
    userImage : nor,
    userName : nor

}

export type loginResponseType = {
    _id : string,
    email : string,
    password : string,
    userName : string,
    userImage : string
}

export type changeUserResponseType = {
    userName : string
}
