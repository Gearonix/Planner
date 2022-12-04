import {formatMonth, normalizeNumber, timeToString} from "../../../global/tools";
import {useDispatch, useSelector} from "react-redux";
import {StateType} from "../../../global/store";
import {setCurrentData} from "../../../reducers/tasksListReducer";
import CalendarGenerator from "./CalendarGenerator/Calendar";
import React, { useState } from "react";
import {useNavigate} from "react-router-dom";
// @ts-ignore
import Calendar from 'react-calendar';

type monthCalendarProps = {
    loadMonth : (fulltime : string) => void
}

const MonthCalendar = ({loadMonth}: monthCalendarProps) => {
    const dispatch = useDispatch()
    const user_id  = useSelector((state : StateType) => state.userData.user_id) || ''
    const currentDate = useSelector((state : StateType) => state.taskLists.current.date)
    const {month: stateMonth,year: stateYear} = useSelector((state : StateType) => state.taskLists)
    const [calendarDate,setCalendarDate] = useState(new Date(+stateYear,+stateMonth - 1))
    const navigate = useNavigate()
    const clickToDay = (date : number) => {
        const submitData = {user_id, fulldate: timeToString(stateYear,stateMonth,normalizeNumber(date))}
        dispatch(setCurrentData(submitData))
    }

    const setAnotherMonth = (dateObject : Date) => {
        const [selectedYear,selectedMonth,day] = [normalizeNumber(dateObject.getFullYear()),
            formatMonth(dateObject.getMonth()),normalizeNumber(dateObject.getDate())]
        const fulltime = timeToString(selectedYear,selectedMonth,day)
        setCalendarDate(dateObject)
        if (selectedMonth == stateMonth && selectedYear == stateYear) {
            dispatch(setCurrentData({user_id,fulldate: fulltime}))
            return
        }

        loadMonth(fulltime)
    }
    if (currentDate) navigate('/day')


    const testHandler = (e : React.WheelEvent<HTMLDivElement>) => {
        console.log(e.deltaY > 0)
    }

    return <div onWheel={testHandler}>
    <CalendarGenerator month={stateMonth} year={stateYear} clickHandler={clickToDay}/>
    <Calendar onChange={setAnotherMonth} value={calendarDate}/>
    </div>
}

export default MonthCalendar
