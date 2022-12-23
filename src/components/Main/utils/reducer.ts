import React from 'react'
import {actionsTypes, componentNameT, mainContextType, mainStateT, modalComponentT} from "../others/mainTypes";
import {createAction, createReducer} from "@reduxjs/toolkit";

export const initialState: mainStateT = {
    modalComponent: null,
    modalIndex: null,
    isModalAnimating: false,
    componentError: null,
    deletingTaskId: null,
    range: 'date',
    isProfile: false,
    isComponentAnimating: false,
    filter: {
        tasks: true,
        reminders: true
    }
}
export const actions = {
    openModal: createAction<modalComponentT>(actionsTypes.openModalComponent),
    setIndex: createAction<number | null>(actionsTypes.setIndex),
    closeModal: createAction(actionsTypes.closeModal),
    animate: createAction<boolean>(actionsTypes.animateModal),
    setError: createAction<string | null>(actionsTypes.setError),
    clearError: createAction(actionsTypes.clearError),
    setDeletingTask: createAction<string | null>(actionsTypes.setDeletingTask),
    switchRange: createAction<componentNameT>(actionsTypes.switchRange),
    setIsProfile: createAction<boolean>(actionsTypes.setIsProfile),
    animateComponent: createAction<boolean>(actionsTypes.animateComponent),
    setFilter: createAction<{ tasks: boolean, reminders: boolean }>(actionsTypes.setFilter)

}

export const mainReducer = createReducer(initialState, builder => {
    builder
        .addCase(actions.openModal, (state, {payload}) => {
            state.modalComponent = payload
        })
        .addCase(actions.setIndex, (state, {payload}) => {
            state.modalIndex = payload
        })
        .addCase(actions.closeModal, state => {
            state.modalComponent = null
        })
        .addCase(actions.animate, (state, {payload}) => {
            state.isModalAnimating = payload
        })
        .addCase(actions.setError, (state, {payload}) => {
            state.componentError = payload
        })
        .addCase(actions.clearError, state => {
            state.componentError = null
        })
        .addCase(actions.setDeletingTask, (state, {payload}) => {
            state.deletingTaskId = payload
        })
        .addCase(actions.switchRange, (state, {payload}) => {
            state.range = payload
        })
        .addCase(actions.setIsProfile, (state, {payload}) => {
            state.isProfile = payload
        })
        .addCase(actions.animateComponent, (state, {payload}) => {
            state.isComponentAnimating = payload
        })
        .addCase(actions.setFilter, (state, {payload}) => {
            state.filter = payload
        })
})

export const MainContext = React.createContext<mainContextType>({
    state: initialState,
    dispatch: () => {
    },
    scrolls: {
        toDay: () => {
        },
        toMonth: () => {
        }
    },
    openModal: () => {
    },
    closeModal: () => {
    }
})


