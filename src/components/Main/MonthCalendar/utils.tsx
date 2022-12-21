import {Dayjs} from "dayjs";
import {taskListType} from "../../../global/types/stateTypes";
import React from "react";
import {CellTask} from "./monthCalendar.styles";
import {taskColors} from "../../../global/constants";

export const CellRender = (daysData: Array<taskListType>) => (value: Dayjs) => {
    const {tasklist} = daysData.find(item => Number(item.date) == value.date()) || {tasklist: []}
    return (
        <>
            {tasklist.map(({title, color}: any, idx) =>
                <CellTask theme={taskColors[color]} key={idx}>{title}</CellTask>)}
        </>
    )
}
