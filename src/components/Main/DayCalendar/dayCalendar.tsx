import {useDispatch, useSelector} from "react-redux";
import {StateType} from "../../../global/store";
import {taskType} from "../../../global/types";
import React from "react";
import {useNavigate} from "react-router-dom";
import { clearCurrentData } from "../../../reducers/tasksListReducer";




const DayCalendar = () => {
    const {date, month, tasklist, weekDay, year} = useSelector((state: StateType) => state.taskLists.current)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const RedirectToMonth  = () => {
        dispatch(clearCurrentData())
    }
    if (!date){
        navigate('/month')
    }


    return <>
        <span>{date + ' ' + month + ' ' + year}</span>
        <span>{weekDay}</span>
        <div>-----</div>
        {tasklist.map((item: taskType,idx) => <span key={idx}>{item.title + ' ' + item.starts + ' ' + item.ends}</span>)}
        <button onClick={RedirectToMonth}>month</button>
    </>
}

export default DayCalendar
