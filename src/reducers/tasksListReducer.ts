import {taskListReducerType, taskListType, taskType} from "../global/types/stateTypes";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import API from "../global/API";
import {isError} from "../global/constants";
import {
    convertPromise,
    createDateData,
    createThunk,
    formatMonth,
    formatNum,
    formatWeekDay,
    stringToTime
} from "../helpers/tools";
import dayjs from "dayjs";
import {setDaysFormT, taskToServerT} from "../global/types/components/mainTypes";


const initialState: taskListReducerType = {
    daysData: [],
    current: {
        user_id: null,
        date: null,
        year: null,
        month: null,
        _id: null,
        tasklist: [],
        weekDay: null
    },
    year: formatNum(new Date().getFullYear()),
    month: formatMonth(),
    date: formatNum(new Date().getDate())

}
type setDaysDataT = {
    data: Array<taskListType>,
    index: number,
    user_id: string,
    fulldate: string,
    sendToCurrent: boolean | void
}


const taskListReducer = createSlice({
    name: 'taskListReducer',
    initialState,
    reducers: {
        setDaysData(state, {payload}: PayloadAction<setDaysDataT>) {
            const [year, month] = stringToTime(payload.fulldate)
            state.daysData = payload.data
            if (!payload.sendToCurrent) {
                state.current = payload.data[payload.index] || createDateData(payload.user_id, payload.fulldate)
                state.current.weekDay = formatWeekDay(dayjs(payload.fulldate).get('day'))
            }
            state.year = year
            state.month = month
        },
        setCurrentData(state, {payload}: PayloadAction<{ user_id: string, fulldate: string }>) {
            const currentState: taskListReducerType = convertPromise(state)
            const [month, date] = stringToTime(payload.fulldate).slice(1)

            const index = currentState.daysData.findIndex(i => i.date == date && i.month == month)
            state.current = currentState.daysData[index] || createDateData(payload.user_id, payload.fulldate)
            state.current.weekDay = formatWeekDay(dayjs(payload.fulldate).get('day'))

        },
        clearCurrentData(state) {
            state.current = initialState.current
        },
        addTaskToList(state, {payload}: PayloadAction<{ id: string, taskData: taskType }>) {
            state.daysData = state.daysData.map(item => item._id == payload.id ?
                {...item, tasklist: [...item.tasklist, payload.taskData]} : item)
            if (payload.taskData.date.split('-')[2] === convertPromise(state).current.date) {
                state.current.tasklist.push(payload.taskData)
            }
        },
        addTaskList(state, {payload}: PayloadAction<taskListType>) {
            const currentState = convertPromise(state)
            if (payload.month == currentState.month
                && payload.year == currentState.year) {
                state.daysData.push(payload)
            }
            if (payload.date === currentState.current.date) {
                state.current.tasklist.push(payload.tasklist[0])
            }

        },
        deleteTaskList(state, {payload}: PayloadAction<string>) {
            const currentState: taskListReducerType = convertPromise(state)
            state.daysData = currentState.daysData.map(day => {
                const index = day.tasklist.findIndex(i => i.task_id == payload)
                if (index != -1) {
                    day.tasklist.splice(index, 1)
                    state.current.tasklist.splice(index, 1)
                }
                return day
            })
        },
        updateTaskList(state, {payload}: PayloadAction<taskType>) {
            const currentState: taskListReducerType = convertPromise(state)
            state.daysData = currentState.daysData.map(day => {
                const index = day.tasklist.findIndex(i => i.task_id == payload.task_id)
                if (index != -1) {
                    day.tasklist[index] = payload
                    state.current.tasklist[index] = payload
                }
                return day
            })
        }
    }
})


export const {
    setDaysData, setCurrentData, clearCurrentData,
    addTaskToList, addTaskList, deleteTaskList,
    updateTaskList
} = taskListReducer.actions


export const setUserDays = createThunk('SET_USER_DAYS',
    async (data: setDaysFormT, {dispatch}) => {
        const {data: response} = await API.getUserDays(data)
        if (isError(response)) return
        const payload: Array<taskListType> = response.data
        const currentIndex = payload.findIndex((day => day.date == stringToTime(data.fulldate)[2]))
        const actionProps = {
            data: response.data, index: currentIndex,
            user_id: data.user_id, fulldate: data.fulldate,
            sendToCurrent: data.noCurrent
        }
        dispatch(setDaysData(actionProps))
    })


type createTaskResT = {
    insertData: taskType,
    result: taskListType,
    wasExisted: boolean
}

export const createTask = createThunk('CREATE_TASK',
    async (data: taskToServerT, {dispatch}) => {
        const {data: response} = await API.createTask(data)
        if (isError(response)) return
        const {insertData, result, wasExisted}: createTaskResT = response.data
        if (wasExisted) {
            dispatch(addTaskToList({id: result._id || '', taskData: insertData}))
            return
        }
        dispatch(addTaskList(result))

    })

export const deleteTask = createThunk('DELETE_TASK',
    async (task_id: string, {dispatch}) => {
        const {data: response} = await API.deleteTask(task_id)
        if (isError(response) || response.data.modifiedCount == 0) {
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
