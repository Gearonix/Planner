import {taskListReducerType, taskListType, taskType} from "../global/types";
import { createSlice, PayloadAction} from "@reduxjs/toolkit";
import ConnectToAPI from "../global/connectToAPI";
import {isError} from "../global/constants";
import {setDaysFormT} from "../components/Main/main";
import {convertPromise, createDateData, formatMonth, formatNum, formatWeekDay, stringToTime} from "../global/tools";
import {taskToServerType} from "../components/Main/DayCalendar/Modal/Modal";
import {globalDispatch, StateType } from "../global/store";
import {createThunk} from "../global/tools";
import dayjs from "dayjs";


const initialState: taskListReducerType = {
    daysData: [],
    current: {
        user_id: null,
        date: null,
        year: null,
        month: null,
        _id: null,
        tasklist: [],
        weekDay : null
    },
    year: formatNum(new Date().getFullYear()),
    month: formatMonth(),
    date : formatNum(new Date().getDate())

}
type setDaysDataT = {
    data: Array<taskListType>,
    index: number,
    user_id: string,
    fulldate : string,
    sendToCurrent : boolean | void
}



const taskListReducer = createSlice({
    name: 'taskListReducer',
    initialState,
    reducers: {
        setDaysData(state, {payload}: PayloadAction<setDaysDataT>) {
            const [year,month] = stringToTime(payload.fulldate)
            state.daysData = payload.data
            if (!payload.sendToCurrent){
                state.current = payload.data[payload.index] || createDateData(payload.user_id,payload.fulldate)
                state.current.weekDay = formatWeekDay(dayjs(payload.fulldate).get('day'))
            }
            state.year = year
            state.month = month
        },
        setCurrentData(state, {payload}: PayloadAction<{ user_id: string, fulldate: string }>) {
            const currentState: taskListReducerType = convertPromise(state)
            const [month, date] = stringToTime(payload.fulldate).slice(1)

            const index = currentState.daysData.findIndex(i => i.date == date && i.month == month)
            state.current =  currentState.daysData[index] || createDateData(payload.user_id, payload.fulldate)
            state.current.weekDay = formatWeekDay(dayjs(payload.fulldate).get('day'))

        },
        clearCurrentData(state) {
            state.current = initialState.current
        },
        addTaskToList(state,{payload} : PayloadAction<{id : string,taskData : taskType}>){
            state.daysData = state.daysData.map(item => item._id == payload.id ?
                {...item,tasklist: [...item.tasklist,payload.taskData]} : item)
            state.current.tasklist.push(payload.taskData)
        },
        addTaskList(state,{payload} : PayloadAction<taskListType>){
            state.daysData.push(payload)
            state.current.tasklist.push(payload.tasklist[0])
        },
        deleteTaskList(state,{payload} : PayloadAction<string>){
            const currentState: taskListReducerType = convertPromise(state)
            state.daysData = currentState.daysData.map(day => {
                const index = day.tasklist.findIndex(i => i.task_id == payload)
                console.log(index)
                if (index != -1) {
                    day.tasklist.splice(index,1)
                    state.current.tasklist.splice(index,1)
                }
                return day
            } )
        }
    }
})

export const {setDaysData, setCurrentData, clearCurrentData,
    addTaskToList,addTaskList,deleteTaskList} = taskListReducer.actions


export const setUserDays = createThunk('SET_USER_DAYS',
    async (data: setDaysFormT, {dispatch}) => {
        const {data: response} = await ConnectToAPI.getUserDays(data)
        if (isError(response)) return
        const payload: Array<taskListType> = response.data
        const currentIndex = payload.findIndex((day => day.date == stringToTime(data.fulldate)[2]))
        const actionProps = {
            data: response.data, index: currentIndex,
            user_id: data.user_id, fulldate : data.fulldate,
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
    async (data: taskToServerType, {dispatch} ) => {
        const {data : response} = await ConnectToAPI.createTask(data)
        if (isError(response)) return
        const {insertData,result,wasExisted} : createTaskResT = response.data
        if (wasExisted)  {
            dispatch(addTaskToList({id: result._id || '' , taskData : insertData}))
            return
        }
        dispatch(addTaskList(result))

})

export const deleteTask = createThunk('DELETE_TASK',
    async (task_id: string, {dispatch}) => {
        const {data : response} = await ConnectToAPI.deleteTask(task_id)
        if (isError(response) || response?.modifiedCount == 0){
            console.log('DELETE_TASK_ERROR')
            return
        }
        console.log(response)
        dispatch(deleteTaskList(task_id))
})



export default taskListReducer.reducer
