import { normalizeNumber, timeToString} from "../../../global/tools";
import {useDispatch, useSelector} from "react-redux";
import {StateType} from "../../../global/store";
import {setCurrentData} from "../../../reducers/tasksListReducer";
import CalendarGenerator from "./CalendarGenerator/Calendar";
import React from "react";
import {useNavigate} from "react-router-dom";
// @ts-ignore

const MonthCalendar = () => {
    const dispatch = useDispatch()
    const user_id  = useSelector((state : StateType) => state.userData.user_id) || ''
    const currentDate = useSelector((state : StateType) => state.taskLists.current.date)
    const {month: stateMonth,year: stateYear} = useSelector((state : StateType) => state.taskLists)
    const navigate = useNavigate()
    const clickToDay = (date : number) => {
        const submitData = {user_id, fulldate: timeToString(stateYear,stateMonth,normalizeNumber(date))}
        dispatch(setCurrentData(submitData))
    }
    if (currentDate) navigate('/day')

    return <div>
    <CalendarGenerator month={stateMonth} year={stateYear} clickHandler={clickToDay}/>
    </div>
}

export default MonthCalendar
