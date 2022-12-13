import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from "react-redux";
import {StateType} from '../../global/store';
import {setCurrentData, setUserDays} from "../../reducers/tasksListReducer";
import DayCalendar from './DayCalendar/dayCalendar';
import MonthCalendar from './MonthCalendar/MonthCalendar';
import {generateTodayDate, stringToTime, timeToString,} from '../../helpers/tools';
import Aside from '../Aside/aside';
import {MainElement, MainPage} from './main.styles';
import Header from '../Header/header';

export type setDaysFormT = {
    user_id: string,
    fulldate: string,
    noCurrent?: boolean
}
export type compValueType = 'createModal' | 'infoModal' | 'editPage' | null
export type mainStatesT = { component: [compValueType, Function], index: [number | null, Function] }

const Main = () => {
    const user_id = useSelector((state: StateType) => state.userData.user_id)
    const currentDate = useSelector((state: StateType) => state.taskLists.current.date)
    const {month: currentMonth, year: currentYear, date} = useSelector((state: StateType) => state.taskLists)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [componentName, openComponent] = useState<compValueType>(null)
    const [componentIndex, setIndex] = useState<number | null>(null)

    const [isAsideOpened, closeAside] = useState<boolean>(false)

    useEffect(() => {
        if (!user_id) return navigate('/login')
        // @ts-ignore
        dispatch(setUserDays({user_id, fulldate: timeToString(currentYear, currentMonth, date)}))
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
    const states: mainStatesT = {component: [componentName, openComponent], index: [componentIndex, setIndex]}

    return  <MainPage className={'dragableMain'}>
        <Header closeAside={() => closeAside(!isAsideOpened)} states={states}/>
        <MainElement>
            <Aside isHide={isAsideOpened} states={states}/>
            {uriPath == '/day' && <DayCalendar toToday={toToday} states={states}/>}
            {uriPath == '/month' && <MonthCalendar toToday={toToday} states={states}/>}
        </MainElement>


    </MainPage>
}










export default Main
