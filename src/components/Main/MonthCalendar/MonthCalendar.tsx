import {formatNum, timeToString} from "../../../helpers/tools";
import {useDispatch, useSelector} from "react-redux";
import {StateType} from "../../../global/store";
import {setCurrentData} from "../../../reducers/tasksListReducer";
import CalendarModule from "./CalendarModule/CalendarModule";
import React from "react";
import {useNavigate} from "react-router-dom";
import {mainStatesT} from "../main";
import {MonthBlock} from "./CalendarModule/CalendarModule.styles";
import {taskType} from "../../../global/types";
// @ts-ignore

const MonthCalendar = ({toToday, states}: { toToday: Function, states: mainStatesT }) => {
    const dispatch = useDispatch()
    const {component: [componentName, openComponent], index: [componentIndex, setIndex]} = states
    const user_id = useSelector((state: StateType) => state.userData.user_id) || ''
    const currentDate = useSelector((state: StateType) => state.taskLists.current.date)
    const {month: stateMonth, year: stateYear} = useSelector((state: StateType) => state.taskLists)
    const navigate = useNavigate()
    const clickToDay = (date: number, task ?: taskType) => {
        const submitData = {user_id, fulldate: timeToString(stateYear, stateMonth, formatNum(date))}
        dispatch(setCurrentData(submitData))
    }
    if (currentDate) navigate('/day')
    return <MonthBlock style={{width: '83%', background: 'transparent'}}>
        <CalendarModule clickHandler={clickToDay} toToday={toToday} states={states}/>
    </MonthBlock>
}

export default MonthCalendar
