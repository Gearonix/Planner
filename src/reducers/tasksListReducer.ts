import {taskListReducerType, taskListType} from "../global/types";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import API from "../global/API";
import {isError} from "../global/constants";
import {setDaysFormT} from "../components/Main/main";
import {convertPromise, createDateData, formatMonth, normalizeNumber, stringToTime} from "../global/tools";

const initialState: taskListReducerType = {
    daysData: [],
    current: {
        user_id: null,
        date: null,
        year: null,
        month: null,
        _id: null,
        tasklist: [],
        weekDay: null,
    },
    year: normalizeNumber(new Date().getFullYear()),
    month: formatMonth(),
    date : normalizeNumber(new Date().getDate())

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
        const {data: response} = await API.getUserDays(data)
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

export default taskListReducer.reducer
