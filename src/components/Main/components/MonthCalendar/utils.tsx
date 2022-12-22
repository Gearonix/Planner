import {Dayjs} from "dayjs";
import React from "react";
import {CellTask} from "./monthCalendar.styles";
import {taskColors} from "../../../../setup/constants";
import {CellRenderType} from "../../others/mainTypes";
import {convertToDate, isDateInThisMonth} from "../../../../utils/tools";


export const CellRender = ({daysData, selectedDate}: CellRenderType) => (value: Dayjs) => {
    if (!isDateInThisMonth(selectedDate, convertToDate(value))) return null

    const {tasklist} = daysData.find(item => Number(item.date) === value.date()) || {tasklist: []}


    return (
        <>
            {tasklist.map(({title, color}: any, idx) =>
                <CellTask theme={taskColors[color]} key={idx}>{title}</CellTask>)}
        </>
    )
}
