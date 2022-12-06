import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from "react-redux";
import {StateType} from '../../global/store';
import {setCurrentData, setUserDays} from "../../reducers/tasksListReducer";
import DayCalendar from './DayCalendar/dayCalendar';
import MonthCalendar from './MonthCalendar/MonthCalendar';
import {
    createDaysAmount,
    formatMonth,
    generateTodayDate,
    normalizeNumber,
    normalizeWeekDay,
    stringToTime,
    timeToString,
    toMonthName,
    ValidateMonthChange
} from '../../global/tools';
import Aside from './Aside/aside';
import {MainElement, MainPage } from './main.styles';
import Header from './Header/header';
import { DropDownText } from './Aside/aside.styles';
import {
    ArrowDownWrap,
    CurrentDate, Grey,
    HeaderInfoWrapper,
    MonthArrow,
    MonthHeader, SortText, TodayButton
} from "./MonthCalendar/CalendarModule/CalendarModule.styles";
import {IoIosArrowBack, IoIosArrowDown, IoIosArrowForward, IoIosArrowUp} from "react-icons/io";

export type setDaysFormT = {
    user_id: string,
    fulldate: string,
    noCurrent ?: boolean
}

const Main = () => {
    const user_id = useSelector((state: StateType) => state.userData.user_id)
    const currentDate = useSelector((state : StateType) => state.taskLists.current.date)
    const {month: currentMonth,year: currentYear,date} = useSelector((state : StateType) => state.taskLists)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [isAsideOpened,closeAside]
        : [a : boolean,b : Function] = useState(false)

    useEffect(() => {
        if (!user_id) return navigate('/login')
        // @ts-ignore
        dispatch(setUserDays({user_id,fulldate : timeToString(currentYear,currentMonth,date)}))
    }, [])

    const toToday = () => {
        // @ts-ignore
        const submitData : { user_id : string, fulldate : string} = {user_id,fulldate : generateTodayDate(true)}
        dispatch(setCurrentData(submitData))
        const [year,month] = stringToTime(submitData.fulldate)
        if (year==currentYear && month==currentMonth) return
        // @ts-ignore
        dispatch(setUserDays(submitData))

    }


    const path = currentDate ? '/day' : '/month'


    return  <MainPage>
        <Header closeAside={() => closeAside(!isAsideOpened)} toToday={toToday}/>
        <MainElement>
            <Aside isHide={isAsideOpened}/>
            {path == '/day' && <DayCalendar toToday={toToday}/>}
            {path == '/month' && <MonthCalendar toToday={toToday}/>}
        </MainElement>


    </MainPage>
}



export const CalendarHeaderC = ({isDay,close,toToday} : { isDay ?: boolean ,close: Function,toToday: Function}) => {
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
            timeToString(year,month,normalizeNumber(+currentDate+count))}))
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






export default Main
