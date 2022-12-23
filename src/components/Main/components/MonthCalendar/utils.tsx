import {Dayjs} from "dayjs";
import React from "react";
import {CellTask} from "./monthCalendar.styles";
import {taskColors} from "../../../../setup/constants";
import {CellRenderType} from "../../others/mainTypes";
import {convertToDate, isDateInThisMonth} from "../../../../utils/tools";


export const CellRender = (props: CellRenderType) => (value: Dayjs) => {
    if (!isDateInThisMonth(props.selectedDate, convertToDate(value))) return null

    const tasks = props.daysData.find(({date}) => Number(date) === value.date())
        ?.tasklist
        ?.filter(({isTask}) => props.filter[isTask ? 'tasks' : 'reminders']) || []

    return (
        <>
            {tasks.map(({title, color}: any, idx: number) =>
                <CellTask theme={taskColors[color]} key={idx}>{title}</CellTask>)}
        </>
    )
}


