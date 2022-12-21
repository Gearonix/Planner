import React from "react";
import {taskType} from "../stateTypes";

export type setDaysFormT = {
    user_id: string,
    fulldate: string,
    noCurrent?: boolean
}
export type modalComponentT = 'createModal' | 'infoModal' | 'editPage' | null

export type componentNameT = 'day' | 'month' | 'profile' | null


export type mainStatesT = { component: [modalComponentT, Function], index: [number | null, Function] }

export type toTodayT = { user_id: string, fulldate: string }

export enum actionsTypes {
    openModalComponent = 'open_modal_component',
    setIndex = 'set_index',
    closeModal = 'close_modal',
    setIsAsideOpened = 'set_is_aside_opened',
    animateModal = 'animate_modal',
    setError = 'set_error',
    clearError = 'clear_error',
    setDeletingTask = 'set_is_task_deleting',
    openComponent = 'open_component'
}

export type mainStateT = {
    modalComponent: modalComponentT,
    componentIndex: number | null,
    isAsideOpened: boolean,
    isModalAnimated: boolean,
    componentError: string | null,
    DeletingTaskId: string | null,
    componentName: componentNameT
}
export type mainContextType = {
    state: mainStateT, dispatch: React.Dispatch<any>,
    toToday: Function, scrolls: Array<() => void>
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
    style: any,
}
