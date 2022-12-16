import React from 'react'
import {actionsTypes, compValueType, mainContextType, mainStateT} from "../../global/types/components/mainTypes";
import {createAction, createReducer} from "@reduxjs/toolkit";

export const initialState: mainStateT = {
    componentName: null,
    componentIndex: null,
    isAsideOpened: false,
    isModalAnimated: false,
    componentError: null,
    DeletingTaskId: null,
    isProfile: false
}
export const actions = {
    openComponent: createAction<compValueType>(actionsTypes.openComponent),
    setIndex: createAction<number | null>(actionsTypes.setIndex),
    closeComponent: createAction(actionsTypes.closeComponent),
    setIsAsideOpened: createAction<boolean>(actionsTypes.setIsAsideOpened),
    animateModal: createAction<boolean>(actionsTypes.animateModal),
    setError: createAction<string | null>(actionsTypes.setError),
    clearError: createAction(actionsTypes.clearError),
    setDeletingTask: createAction<string | null>(actionsTypes.setDeletingTask),
    openProfile: createAction<boolean>(actionsTypes.openProfile)
}

export const mainReducer = createReducer(initialState, builder => {
    builder
        .addCase(actions.openComponent, (state, {payload}) => {
            state.componentName = payload
        })
        .addCase(actions.setIndex, (state, {payload}) => {
            state.componentIndex = payload
        })
        .addCase(actions.closeComponent, state => {
            state.componentName = null
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
        .addCase(actions.openProfile, (state, {payload}) => {
            state.isProfile = payload
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

