import {nor} from "./appTypes";
import {selectedDateT} from "../components/Main/others/mainTypes";

export type loginType = {
    user_id: nor,
    email: nor,
    password: nor,
    userImage: nor,
    userName: nor

}
export type taskListReducerType = {
    daysData: Array<taskListType>,
    selectedDate: selectedDateT
}


export type taskType = {
    title: string,
    task_id: nor,
    starts: string,
    ends: string,
    taskBackground: nor,
    selectedDate: selectedDateT,
    color: string,
    description: string,
    repetitionDelay: string,
    isTask: boolean
}


export type taskListType = {
    user_id: string,
    date: string,
    year: string,
    month: string,
    _id: string,
    tasklist: Array<taskType>,
    weekDay?: string
}
export type createTaskResT = {
    insertData: taskType,
    result: taskListType,
    wasExisted: boolean
}
