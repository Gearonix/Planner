import React from "react";

export type nor = null | string

export type loginType = {
    user_id : nor,
    email : nor,
    password: nor,
    userImage : nor,
    userName : nor

}

export type taskType = {
    title : string,
    task_id : string,
    starts : string,
    ends : string,
    taskBackground : nor,
    date : string,
    color: string,
    description : nor,
    repetitionDelay : string
}
export type taskListType = {
    user_id : nor,
    date : nor,
    year : nor,
    month : nor,
    _id : nor,
    tasklist : Array<taskType>,
    weekDay : nor,
}

export type taskListReducerType = {
    daysData : Array<taskListType>,
    current : taskListType,
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


export type refType = React.RefObject<HTMLInputElement>