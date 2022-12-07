import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from "react-redux";
import {StateType} from '../../global/store';
import {setCurrentData, setUserDays} from "../../reducers/tasksListReducer";
import DayCalendar from './DayCalendar/dayCalendar';
import MonthCalendar from './MonthCalendar/MonthCalendar';
import {
    generateTodayDate,
    stringToTime,
    timeToString,
} from '../../global/tools';
import Aside from './Aside/aside';
import { MainElement, MainPage } from './main.styles';
import Header from './Header/header';
import DayModal from "./DayCalendar/Modal/Modal";

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

    const [isAsideOpened,closeAside] = useState<boolean>(false)

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
    const uriPath = currentDate ? '/day' : '/month'


    return  <MainPage >
        <Header closeAside={() => closeAside(!isAsideOpened)} toToday={toToday}/>
        <MainElement>
            <Aside isHide={isAsideOpened}/>
            {uriPath == '/day' && <DayCalendar toToday={toToday}/>}
            {uriPath == '/month' && <MonthCalendar toToday={toToday}/>}

        </MainElement>


    </MainPage>
}










export default Main
