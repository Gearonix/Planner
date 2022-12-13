import {
    capitalizeFirstLetter,
    createDaysAmount,
    cutString,
    generateCalendarArray,
    getArrayByC
} from "../../../../helpers/tools";
import React from "react";
import {taskColors, WEEKDAYS} from "../../../../global/constants";
import {
    CalendarCell,
    CalendarTable,
    CalenRow,
    CellTask,
    CellTitle,
    CelTasks,
    MonthBlock,
    WekkendRow
} from "./CalendarModule.styles";
import {useSelector} from "react-redux";
import {StateType} from "../../../../global/store";
import {taskListType, taskType} from "../../../../global/types";
import CalendarHeader from "../../../others/CalendarHeader/CalendarHeader";
import ModalWrapper from "../../../others/Modals/modalWrapper/modalWrapper";
import {mainStatesT} from "../../main";

type calendarProps = {
    clickHandler: (n: number) => void,
    toToday: Function,
    states: mainStatesT
}

const CalendarModule = ({clickHandler: handle, toToday, states}: calendarProps) => {
    const {month, year, date: currentDate} = useSelector((state: StateType) => state.taskLists)
    const daysData = useSelector((state: StateType) => state.taskLists.daysData)
    const daysAmount = createDaysAmount(year, month)
    const pastDaysAmount = createDaysAmount(year, +month - 1)
    const firstWeekDay = (new Date(+year, (+month) - 1, 1).getDay())
    const calendarArray = generateCalendarArray(firstWeekDay, daysAmount)
    const numbers = getArrayByC(daysAmount).map(i => i + 1)

    const calendarHead = <WekkendRow>{getArrayByC(7).map((i, idx) => <Cell key={idx}
                                                                           title={capitalizeFirstLetter(WEEKDAYS[i])}/>)}</WekkendRow>
    const {component: [componentName, openComponent], index: [componentIndex, setIndex]} = states

    return <MonthBlock className={'dragableMain'}>
        {componentName == 'createModal' && <ModalWrapper close={() => openComponent(null)} index={12}/>}
        <CalendarHeader close={() => handle(+currentDate)} toToday={toToday}/>
        <CalendarTable>
            <tbody>
            {calendarHead}
            <CalenRow>
                <FirstRow firstWeekDay={firstWeekDay}
                          numbers={numbers} handle={handle}
                          daysAmount={pastDaysAmount}
                          daysData={daysData}
                />
            </CalenRow>
            <OtherRows calendarArray={calendarArray} numbers={numbers} firstWeekDay={firstWeekDay}
                       handle={handle} daysData={daysData}/>
            </tbody>
        </CalendarTable>
    </MonthBlock>
}

type firstRowType = {
    firstWeekDay: number,
    numbers: Array<number>,
    handle: (n: number) => void,
    daysAmount : number,
    daysData :Array<taskListType>
}

const FirstRow = ({firstWeekDay, numbers, handle,
                  daysAmount,daysData}: firstRowType) => {

    return <>
        {getArrayByC(firstWeekDay).map((i, idx) => {
            return <Cell key={idx} title={daysAmount - firstWeekDay + idx + 1 } dis={true}/>
        })}

        {getArrayByC(7 - firstWeekDay).map((i, idx) => {
            const tasklist = daysData.find(({date}) => Number(date)==numbers[idx])
                ?.tasklist || []
            return <Cell key={idx} handler={() => handle(numbers[idx])}
                         title={numbers[idx]} tasklist={tasklist}/>
        })}
    </>
}


type otherRowsType =
    {
        calendarArray: Array<number>,
        firstWeekDay: number
        numbers: Array<number>,
        handle: (n: number) => void,
        daysData : Array<taskListType>
    }


const OtherRows = ({calendarArray, numbers, firstWeekDay, handle,daysData}: otherRowsType) => <>
    {calendarArray.slice(1).map((item: number, globIdx) => {
        return <CalenRow key={globIdx}>
            {getArrayByC(item).map((item, idx) => {
                    const num = numbers[(idx + (7 - firstWeekDay)) + 7 * globIdx]

                    const tasklist = daysData.find(({date}) => Number(date)==num)
                    ?.tasklist || []

                    return <Cell
                        key={idx} handler={() => handle(num)} title={num} tasklist={tasklist}/>
                }
            )}
            {getArrayByC(7 - item).map((i, idx) => <Cell key={idx} title={idx + 1} dis={true}/>)}
        </CalenRow>
    })}
</>


type cellType = {
    title : string | number,
    handler?: any,
    dis ?: boolean,
    tasklist ?: Array<taskType>
}

const Cell = ({title,handler ,dis,tasklist = []} : cellType) => {
    return <CalendarCell
        onClick={handler ? handler : () => {}} dis={dis}>
        <CellTitle>
            {title}
        </CellTitle>
        {tasklist.length>0 && <CelTasks>
            {/*@ts-ignore*/}
            {tasklist.map((task, idx) => <CellTask color={taskColors[task.color]}
                                                   key={idx}>
                {task.starts} - {cutString(task.title)}
            </CellTask>)}
        </CelTasks>
        }
    </CalendarCell>
}




export default CalendarModule
