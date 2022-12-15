import {
    capitalizeFirstLetter,
    createDaysAmount,
    formatNum,
    generateCalendarArray,
    getArrayByC
} from "../../../helpers/tools";
import React, {useContext} from "react";
import {WEEKDAYS} from "../../../global/constants";
import {CalendarTable, CalenRow, InnerMonthBlock, MonthBlock, WekkendRow} from "./monthCalendar.styles";
import {useDispatch, useSelector} from "react-redux";
import CalendarHeader from "../../others/CalendarHeader/CalendarHeader";
import ModalWrapper from "../../others/Modals/modalWrapper/modalWrapper";
import {MainContext} from "../reducer";
import Selectors from "../../../helpers/selectors";
import {setCurrentData} from "../../../reducers/tasksListReducer";
import {Cell, FirstRow, OtherRows} from "./components";
import {animated, useSpring} from "@react-spring/web";
import Animations from "../../../helpers/animations";


const MonthCalendar = () => {
    const {month, year, date: currentDate} = useSelector(Selectors.taskLists)
    const daysData = useSelector(Selectors.daysData)
    const user_id = useSelector(Selectors.userId)
    const dispatch = useDispatch()

    const context = useContext(MainContext)
    const mainState = context.state

    const clickToDay = (date: number) => {
        const fulldate = `${year}-${month}-${formatNum(date)}`
        dispatch(setCurrentData({user_id, fulldate}))
        context.scrolls[1]()
    }

    //calendar creating block
    const daysAmount = createDaysAmount(year, month)
    const pastDaysAmount = createDaysAmount(year, +month - 1)
    const firstWeekDay = (new Date(+year, (+month) - 1, 1).getDay())
    const calendarArray = generateCalendarArray(firstWeekDay, daysAmount)
    const numbers = getArrayByC(daysAmount).map(i => i + 1)
    //

    const [animations, api] = useSpring(Animations.monthMoves().start, [])
    const animatMonth = (direction: 1 | -1) => api.start(Animations.monthMoves()[direction == -1 ? 'next' : 'prev'])


    console.log(animations.x)
    return <MonthBlock as={animated.div}
                       style={{transform: animations.x.to(Animations.monthMoves().transform)}}>
        <InnerMonthBlock className={'dragableMain'}>
            {mainState.componentName == 'createModal' && <ModalWrapper/>}
            <CalendarHeader close={() => clickToDay(+currentDate)} animation={animatMonth}/>
            <CalendarTable>
                <tbody>
                <WekkendRow>{getArrayByC(7).map((i, idx) => <Cell key={idx}
                                                                  title={capitalizeFirstLetter(WEEKDAYS[i])}/>)}</WekkendRow>
                <CalenRow>
                    <FirstRow firstWeekDay={firstWeekDay}
                              numbers={numbers} handle={clickToDay}
                              daysAmount={pastDaysAmount}
                              daysData={daysData}/>
                </CalenRow>
                <OtherRows calendarArray={calendarArray} numbers={numbers} firstWeekDay={firstWeekDay}
                           handle={clickToDay} daysData={daysData}/>
                </tbody>
            </CalendarTable>
        </InnerMonthBlock></MonthBlock>
}


export default MonthCalendar
