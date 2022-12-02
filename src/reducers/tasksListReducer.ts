import { taskListReducerType, taskListType} from "../global/types";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import API from "../global/API";
import {isError} from "../global/constants";
import {setDaysFormT} from "../components/Main/main";
import {convertPromise, createDateData} from "../global/tools";

const initialState: taskListReducerType = {
    daysData: [],
    current: {
        user_id: null,
        date: null,
        year: null,
        month: null,
        _id: null,
        tasklist: [],
        weekDay : null,
    },
}
type setDaysDataT = {
    data : Array<taskListType>,
    index : number,
    user_id : string
}

const taskListReducer = createSlice({
    name: 'taskListReducer',
    initialState,
    reducers: {
        setDaysData(state, {payload}: PayloadAction<setDaysDataT>) {
                state.daysData = [...state.daysData, ...payload.data]
                state.current = payload.index !=-1 ? payload.data[payload.index] : createDateData(payload.user_id)
        },
        setCurrentData(state, {payload} : PayloadAction<{ user_id : string, fulltime : string }>){
            const currentState : taskListReducerType = convertPromise(state)
            const [month,date] = payload.fulltime.split('-').slice(1)
            const index = currentState.daysData.findIndex(i => i.date == date && i.month == month )
            state.current = index == -1 ? createDateData(payload.user_id,payload.fulltime) :
                currentState.daysData[index]
        },
    }
})

export const {setDaysData,setCurrentData} = taskListReducer.actions


export const setUserDays = createAsyncThunk('SET_USER_DAYS',
    async (data: setDaysFormT, {dispatch}) => {
        const {data: response}  = await API.getUserDays(data)
        if (isError(response)) return
        const payload: Array<taskListType> = response.data
        const currentDay = new Date().getDate()
        const format = (number : number) => (number.toString().length==1 ? '0' + number : String(number))
        console.log(payload)
        const currentIndex = payload.findIndex((day => day.date == format(currentDay)))
        dispatch(setDaysData({data : response.data,index : currentIndex,user_id : data.user_id}))
    })

export default taskListReducer.reducer
