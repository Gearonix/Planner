import {createTaskResT, taskListReducerType, taskListType, taskType} from "../../types/stateTypes";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import API from "../API";
import {convertPromise, createThunk, isDateInThisMonth, isError} from "../../utils/tools";
import dayjs from "dayjs";
import {selectedDateT, taskToServerT} from "../../components/Main/others/mainTypes";


const initialState: taskListReducerType = {
    daysData: [],
    selectedDate: {
        year: dayjs().format('YYYY'),
        month: dayjs().format('MM'),
        date: dayjs().format('DD')
    }
}
type setDaysDataT = {
    data: Array<taskListType>,
    selectedDate: selectedDateT,
}


const taskListReducer = createSlice({
    name: 'taskListReducer',
    initialState,
    reducers: {
        setDaysData(state, {payload}: PayloadAction<setDaysDataT>) {
            state.daysData = payload.data
            state.selectedDate = payload.selectedDate
        },
        setDate(state, {payload}: PayloadAction<selectedDateT>) {
            state.selectedDate = payload
        }
        ,
        addTaskToList(state, {payload}: PayloadAction<{ id: string, taskData: taskType }>) {
            state.daysData = state.daysData.map(item => item._id === payload.id ?
                {...item, tasklist: [...item.tasklist, payload.taskData]} : item)
        },
        addTaskList(state, {payload}: PayloadAction<taskListType>) {
            state.daysData.push(payload)
        },
        deleteTaskList(state, {payload}: PayloadAction<string>) {
            const currentState = convertPromise(state)
            state.daysData = currentState.daysData.map(day => {
                const index = day.tasklist.findIndex(i => i.task_id === payload)
                if (index !== -1) day.tasklist.splice(index, 1)
                return day
            })
        },
        updateTaskList(state, {payload}: PayloadAction<taskType>) {
            const currentState = convertPromise(state)
            state.daysData = currentState.daysData.map(day => {
                const index = day.tasklist.findIndex(i => i.task_id === payload.task_id)
                if (index !== -1) day.tasklist[index] = payload
                return day
            })
        }
    }
})


export const {
    setDaysData, addTaskToList, addTaskList, deleteTaskList, updateTaskList,
    setDate
} = taskListReducer.actions

export const setUserDays = createThunk('SET_USER_DAYS',
    async (selectedDate: selectedDateT, {dispatch, getState}) => {
        const user_id = getState().userData.user_id
        const {data: response} = await API.getUserDays({user_id, selectedDate})

        if (isError(response)) return
        const payload: Array<taskListType> = response.data
        dispatch(setDaysData({data: payload, selectedDate}))
    })


export const createTask = createThunk('CREATE_TASK',
    async (data: taskToServerT, {dispatch, getState}) => {
        const {data: response} = await API.createTask(data)
        if (isError(response)) return
        const {insertData, result, wasExisted}: createTaskResT = response.data

        const selectedDate = data.data.selectedDate
        if (!isDateInThisMonth(selectedDate, getState().taskLists.selectedDate)) {
            return
        }

        if (wasExisted) {
            return dispatch(addTaskToList({id: result._id || '', taskData: insertData}))
        }
        dispatch(addTaskList(result))
    })

export const deleteTask = createThunk('DELETE_TASK',
    async (task_id: string, {dispatch}) => {
        const {data: response} = await API.deleteTask(task_id)
        if (isError(response) || response.data.modifiedCount === 0) {
            return console.error('DELETE_TASK_ERROR')
        }
        dispatch(deleteTaskList(task_id))
    })

export const updateTask = createThunk('UPDATE_TASK',
    async (data: taskToServerT, {dispatch}) => {
        const {data: response} = await API.updateTask(data)
        if (isError(response)) return console.error('UPDATE_TASK_ERROR')
        dispatch(updateTaskList(data.data))
    })


export default taskListReducer.reducer
