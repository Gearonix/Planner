import {getCurrentMonth, getCurrentYear, normalizeNumber, timeToString} from "../../../global/tools";
import {useDispatch, useSelector} from "react-redux";
import {StateType} from "../../../global/store";
import {setCurrentData} from "../../../reducers/tasksListReducer";
import CalendarGenerator from "./CalendarGenerator/Calendar";
import React from "react";


type monthCalendarProps = {
    year?: string,
    month?: string
}

const MonthCalendar = ({year = getCurrentYear(), month = getCurrentMonth()}: monthCalendarProps) => {
    const dispatch = useDispatch()
    const user_id  = useSelector((state : StateType) => state.userData.user_id)
    const clickHandler = (date : number) => {
        const submitData = {user_id : user_id || '',fulltime: timeToString(year,month,normalizeNumber(date))}
        console.log(submitData)
        dispatch(setCurrentData(submitData))
    }

    return <CalendarGenerator month={month} year={year} clickHandler={clickHandler}/>
}

export default MonthCalendar
