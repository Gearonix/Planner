import {taskListReducerType, taskListType, taskType} from "../global/types";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import ConnectToAPI from "../global/connectToAPI";
import {isError} from "../global/constants";
import {setDaysFormT} from "../components/Main/main";
import {convertPromise, createDateData, formatMonth, formatNum, stringToTime} from "../global/tools";
import {taskToServerType} from "../components/Main/DayCalendar/Modal/Modal";

const initialState: taskListReducerType = {
    daysData: [],
    current: {
        user_id: null,
        date: null,
        year: null,
        month: null,
        _id: null,
        tasklist: [],
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
            }
            state.year = year
            state.month = month
        },
        setCurrentData(state, {payload}: PayloadAction<{ user_id: string, fulldate: string }>) {
            const currentState: taskListReducerType = convertPromise(state)
            const [month, date] = stringToTime(payload.fulldate).slice(1)

            const index = currentState.daysData.findIndex(i => i.date == date && i.month == month)
            state.current =  currentState.daysData[index] || createDateData(payload.user_id, payload.fulldate)
        },
        clearCurrentData(state) {
            state.current = initialState.current
        }
    }
})

export const {setDaysData, setCurrentData, clearCurrentData} = taskListReducer.actions


export const setUserDays = createAsyncThunk('SET_USER_DAYS',
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

export const createTask = createAsyncThunk('CREATE_TASK',
    async (data: taskToServerType, {dispatch}) => {
        const {data : response} = await ConnectToAPI.createTask(data)
        if (isError(response)) return
        console.log(response)
})



export default taskListReducer.reducer
