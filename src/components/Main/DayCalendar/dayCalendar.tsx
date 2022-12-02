import {useSelector} from "react-redux";
import {StateType} from "../../../global/store";
import {taskType} from "../../../global/types";
import React from "react";

const DayCalendar = () => {
    const {
        date, month, tasklist, user_id: taskListUser, weekDay,
        year, _id
    } = useSelector((state: StateType) => state.taskLists.current)
    return <>
        <span>{date + ' ' + month + ' ' + year}</span>
        <span>{weekDay}</span>
        <div>-----</div>
        {tasklist.map((item: taskType) => <span>{item.title + ' ' + item.starts + ' ' + item.ends}</span>)}
    </>
}

export default DayCalendar
