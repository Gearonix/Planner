import {cellType, firstRowType, otherRowsType} from "../../../global/types/components/mainTypes";
import {CalendarCell, CalenRow, CellTask, CellTitle, CelTasks} from "./monthCalendar.styles";
import {taskColors} from "../../../global/constants";
import {cutString, getArrayByC} from "../../../helpers/tools";
import React from "react";

export const Cell = ({title, handler, dis, tasklist = []}: cellType) => {
    return <CalendarCell
        onClick={handler ? handler : () => {
        }} dis={dis}>
        <CellTitle>
            {title}
        </CellTitle>
        {tasklist.length > 0 && <CelTasks>
            {tasklist.map((task, idx) => <CellTask theme={taskColors[task.color]}
                                                   key={idx}>
                {task.starts} - {cutString(task.title)}
            </CellTask>)}
        </CelTasks>
        }
    </CalendarCell>
}
export const OtherRows = ({calendarArray, numbers, firstWeekDay, handle, daysData}: otherRowsType) => <>
    {calendarArray.slice(1).map((item: number, globIdx) => {
        return <CalenRow key={globIdx}>
            {getArrayByC(item).map((item, idx) => {
                    const num = numbers[(idx + (7 - firstWeekDay)) + 7 * globIdx]

                    const tasklist = daysData.find(({date}) => Number(date) == num)
                        ?.tasklist || []

                    return <Cell
                        key={idx} handler={() => handle(num)} title={num} tasklist={tasklist}/>
                }
            )}
            {getArrayByC(7 - item).map((i, idx) => <Cell key={idx} title={idx + 1} dis={true}/>)}
        </CalenRow>
    })}
</>
export const FirstRow = ({
                             firstWeekDay, numbers, handle,
                             daysAmount, daysData
                         }: firstRowType) => {

    return <>
        {getArrayByC(firstWeekDay).map((i, idx) => {
            return <Cell key={idx} title={daysAmount - firstWeekDay + idx + 1} dis={true}/>
        })}

        {getArrayByC(7 - firstWeekDay).map((i, idx) => {
            const tasklist = daysData.find(({date}) => Number(date) == numbers[idx])
                ?.tasklist || []
            return <Cell key={idx} handler={() => handle(numbers[idx])}
                         title={numbers[idx]} tasklist={tasklist}/>
        })}
    </>
}
