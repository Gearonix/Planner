import { formatNum, timeToString} from "../../../global/tools";
import {useDispatch, useSelector} from "react-redux";
import {StateType} from "../../../global/store";
import {setCurrentData} from "../../../reducers/tasksListReducer";
import CalendarModule from "./CalendarModule/CalendarModule";
import React from "react";
import {useNavigate} from "react-router-dom";
// @ts-ignore

const MonthCalendar = ({toToday} : {toToday : Function}) => {
    const dispatch = useDispatch()
    const user_id  = useSelector((state : StateType) => state.userData.user_id) || ''
    const currentDate = useSelector((state : StateType) => state.taskLists.current.date)
    const {month: stateMonth,year: stateYear} = useSelector((state : StateType) => state.taskLists)
    const navigate = useNavigate()
    const clickToDay = (date : number) => {
        const submitData = {user_id, fulldate: timeToString(stateYear,stateMonth,formatNum(date))}
        dispatch(setCurrentData(submitData))
    }
    if (currentDate) navigate('/day')

    return <div>
    <CalendarModule clickHandler={clickToDay} toToday={toToday}/>
    </div>
}

export default MonthCalendar
