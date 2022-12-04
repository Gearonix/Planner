import {createDaysAmount, generateCalendarArray, getArrayByC} from "../../../../global/tools";
import React from "react";
import {weekDays} from "../../../../global/constants";


type calendarProps = {
    year: string,
    month: string,
    clickHandler: (n: number) => void
}

const CalendarGenerator = ({year, month, clickHandler: handle}: calendarProps) => {
    const daysAmount = createDaysAmount(year, month)
    const firstWeekDay = (new Date(+year, (+month) - 1, 1).getDay())

    const calendarArray = generateCalendarArray(firstWeekDay, daysAmount)
    const numbers = getArrayByC(daysAmount).map(i => i + 1)

    const calendarHead = <tr>{getArrayByC(7).map((i, idx) => <td key={idx}>{weekDays[i].toUpperCase()}</td>)}</tr>
    return <>
        <span>{year + '-' + month}</span>
        <table>
            <tbody>
            {calendarHead}
            <tr>
                <FirstRow firstWeekDay={firstWeekDay} numbers={numbers} handle={handle}/>
            </tr>
            <OtherRows calendarArray={calendarArray} numbers={numbers} firstWeekDay={firstWeekDay}
                       handle={handle}/>
            </tbody>
        </table>

    </>
}

type firstRowType = {
    firstWeekDay: number,
    numbers: Array<number>,
    handle: (n: number) => void
}

const FirstRow = ({firstWeekDay, numbers, handle}: firstRowType) => <>
    {getArrayByC(firstWeekDay).map((i, idx) => {
        return <td key={idx}>empty</td>
    })}

    {getArrayByC(7 - firstWeekDay).map((i, idx) => {
        return <td key={idx} onClick={() => handle(numbers[idx])}>{numbers[idx]}</td>
    })}
</>

type otherRowsType =
    {
        calendarArray: Array<number>,
        firstWeekDay: number
        numbers: Array<number>,
        handle: (n: number) => void
    }


const OtherRows = ({calendarArray, numbers, firstWeekDay, handle}: otherRowsType) => <>
    {calendarArray.slice(1).map((item: number, globIdx) => {
        return <tr key={globIdx}>
            {getArrayByC(item).map((item, idx) => {
                    const num = numbers[(idx + (7 - firstWeekDay)) + 7 * globIdx]
                    return <td
                        key={idx} onClick={() => handle(num)}>{num}</td>
                }
            )}
            {getArrayByC(7 - item).map((i, idx) => <td key={idx}>empty</td>)}
        </tr>
    })}
</>


export default CalendarGenerator
