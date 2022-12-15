import React from "react";
import {taskListType, taskType} from "../stateTypes";

export type setDaysFormT = {
    user_id: string,
    fulldate: string,
    noCurrent?: boolean
}
export type compValueType = 'createModal' | 'infoModal' | 'editPage' | null

export type mainStatesT = { component: [compValueType, Function], index: [number | null, Function] }

export type toTodayT = { user_id: string, fulldate: string }

export enum actionsTypes {
    openComponent = 'open_component',
    setIndex = 'set_index',
    closeComponent = 'close_component',
    setIsAsideOpened = 'set_is_aside_opened',
    animateModal = 'animate_modal',
    setError = 'set_error',
    clearError = 'clear_error'
}

export type mainStateT = {
    componentName: compValueType,
    componentIndex: number | null,
    isAsideOpened: boolean,
    isModalAnimated: boolean,
    componentError: string | null
}
export type mainContextType = {
    state: mainStateT, dispatch: React.Dispatch<any>,
    toToday: Function, scrolls: Array<() => void>
}
export type firstRowType = {
    firstWeekDay: number,
    numbers: Array<number>,
    handle: (n: number) => void,
    daysAmount: number,
    daysData: Array<taskListType>
}
export type otherRowsType =
    {
        calendarArray: Array<number>,
        firstWeekDay: number
        numbers: Array<number>,
        handle: (n: number) => void,
        daysData: Array<taskListType>
    }
export type cellType = {
    title: string | number,
    handler?: any,
    dis?: boolean,
    tasklist?: Array<taskType>
}
export type taskToServerT = {
    user_id: string | null,
    data: taskType,
}
export type createModalUIType = {
    formik: any,
    close: () => void,
    error: string | null,
    style?: any,
}
export type CalendarHeaderProps = {
    isDay?: boolean, close: Function,
    animation?: Function
}
