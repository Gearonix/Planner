import React from "react";
import {taskListType, taskType} from "../../../types/stateTypes";

export type modalComponentT = 'createModal' | 'infoModal' | 'editPage' | null

export type componentNameT = 'date' | 'month'


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
    switchRange = 'switch_range',
    setIsProfile = 'set_is_profile',
    animateComponent = 'animate_component',
}

export type mainStateT = {
    modalComponent: modalComponentT,
    modalIndex: number | null,
    isAsideOpened: boolean,
    isModalAnimating: boolean,
    componentError: string | null,
    deletingTaskId: string | null,
    range: componentNameT,
    isProfile: boolean,
    isComponentAnimating: boolean
}
export type mainContextType = {
    state: mainStateT, dispatch: React.Dispatch<any>,
    scrolls: {
        toMonth: () => void,
        toDay: () => void
    },
    openModal: (idx: number, name: modalComponentT) => void,
    closeModal: () => void
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
    startClosing: () => void,
    error: string | null,
    style: any,
}

export type hoursProps = {
    openModal: Function,
    tasklist: Array<taskType>,
    deleteTask: (id: string) => () => void,
    state: mainStateT,
    style?: any
}

export type selectedDateT = {
    year: string,
    month: string,
    date: string
}

export type getUserDaysT = {
    selectedDate: selectedDateT,
    user_id: string | null
}
export type taskProps = {
    task: taskType,
    state: mainStateT,
    openInfo: () => void,
    deleteTask: (id: string) => () => void
}
export type infoModalT = {
    style: any,
    task: taskType,
    openEditPage: () => void,
    close: () => void,
    deleteTask: () => void,
    userName: string | null
}
export type CellRenderType = {
    daysData: Array<taskListType>, selectedDate: selectedDateT,
}
