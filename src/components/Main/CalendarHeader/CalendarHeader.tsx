import {useDispatch, useSelector} from "react-redux";
import {StateType} from "../../../global/store";
import {
    createDaysAmount,
    formatNum,
    normalizeWeekDay,
    timeToString, toMonthName,
    ValidateMonthChange
} from "../../../global/tools";
import {setCurrentData, setUserDays} from "../../../reducers/tasksListReducer";
import {
    ArrowDownWrap,
    CurrentDate, Grey,
    HeaderInfoWrapper,
    MonthArrow,
    MonthHeader, SortText, TodayButton
} from "../MonthCalendar/CalendarModule/CalendarModule.styles";
import {IoIosArrowBack, IoIosArrowDown, IoIosArrowForward, IoIosArrowUp} from "react-icons/io";
import React from "react";

const CalendarHeaderC = ({isDay,close,toToday} : { isDay ?: boolean ,close: Function,toToday: Function}) => {
    const {month,year} = useSelector((state : StateType) => state.taskLists)
    const {weekDay,date
        :currentDate} = useSelector((state : StateType) => state.taskLists.current)
    const dispatch = useDispatch()
    const user_id  = useSelector((state : StateType) => state.userData.user_id) || ''
    const switchMonth = (count : -1 | 1) => {
        const [selectedYear,selectedMonth] = ValidateMonthChange(+year,+month + count)
        const fulldate = timeToString(selectedYear,selectedMonth,currentDate || '01')

        const isDayElement = isDay && currentDate && +currentDate+count <
            createDaysAmount(year,month)+1 && +currentDate + count > 0
        if (isDayElement) {
            dispatch(setCurrentData({user_id,fulldate :
                    timeToString(year,month,formatNum(+currentDate+count))}))
            return
        }
        // @ts-ignore
        dispatch(setUserDays({user_id, fulldate, noCurrent: true}))
    }

    return <MonthHeader width={isDay ? 25 : 17}>
    <HeaderInfoWrapper>
        <CurrentDate width={!isDay ? 160 : 100}>
    {currentDate ? normalizeWeekDay(weekDay || '')
        + ' ' + +currentDate :
        toMonthName(month) + ' ' + year}
    </CurrentDate>
    <MonthArrow>
    <IoIosArrowBack onClick={() => switchMonth(-1)}/>
    </MonthArrow>
    <MonthArrow>
    <IoIosArrowForward onClick={() => switchMonth(1)}/>
    </MonthArrow>


    </HeaderInfoWrapper>
    <HeaderInfoWrapper>
    {/*@ts-ignore*/}
    <TodayButton onClick={toToday}>
        Today
        </TodayButton>
    {/*@ts-ignore*/}
    <SortText onClick={close}>
        Sort By: <Grey>{isDay ? 'Day' : 'Month'}</Grey>
    </SortText>
    <ArrowDownWrap>
    {!isDay ? <IoIosArrowDown/> : <IoIosArrowUp/>}
    </ArrowDownWrap>

    </HeaderInfoWrapper>
    </MonthHeader>

}

export default CalendarHeaderC
