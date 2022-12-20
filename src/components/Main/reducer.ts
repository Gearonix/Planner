import React from 'react'
import {
    actionsTypes,
    componentNameT,
    mainContextType,
    mainStateT,
    modalComponentT
} from "../../global/types/components/mainTypes";
import {createAction, createReducer} from "@reduxjs/toolkit";

export const initialState: mainStateT = {
    modalComponent: null,
    componentIndex: null,
    isAsideOpened: false,
    isModalAnimated: false,
    componentError: null,
    DeletingTaskId: null,
    componentName: 'day'
}
export const actions = {
    openModal: createAction<modalComponentT>(actionsTypes.openModalComponent),
    setIndex: createAction<number | null>(actionsTypes.setIndex),
    closeComponent: createAction(actionsTypes.closeComponent),
    setIsAsideOpened: createAction<boolean>(actionsTypes.setIsAsideOpened),
    animateModal: createAction<boolean>(actionsTypes.animateModal),
    setError: createAction<string | null>(actionsTypes.setError),
    clearError: createAction(actionsTypes.clearError),
    setDeletingTask: createAction<string | null>(actionsTypes.setDeletingTask),
    openComponent: createAction<componentNameT>(actionsTypes.openComponent)

}

export const mainReducer = createReducer(initialState, builder => {
    builder
        .addCase(actions.openModal, (state, {payload}) => {
            state.modalComponent = payload
        })
        .addCase(actions.setIndex, (state, {payload}) => {
            state.componentIndex = payload
        })
        .addCase(actions.closeComponent, state => {
            state.modalComponent = null
        })
        .addCase(actions.setIsAsideOpened, (state, {payload}) => {
            state.isAsideOpened = payload
        })
        .addCase(actions.animateModal, (state, {payload}) => {
            state.isModalAnimated = payload
        })
        .addCase(actions.setError, (state, {payload}) => {
            state.componentError = payload
        })
        .addCase(actions.clearError, state => {
            state.componentError = null
        })
        .addCase(actions.setDeletingTask, (state, {payload}) => {
            state.DeletingTaskId = payload
        })
        .addCase(actions.openComponent, (state, {payload}) => {
            state.componentName = payload
        })
})

export const MainContext = React.createContext<mainContextType>({
    state: initialState,
    dispatch: () => {
    },
    toToday: () => {
    },
    scrolls: [() => {
    }, () => {
    }]
})

