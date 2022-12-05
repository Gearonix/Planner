import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from "react-redux";
import {StateType} from '../../global/store';
import {setUserDays} from "../../reducers/tasksListReducer";
import DayCalendar from './DayCalendar/dayCalendar';
import MonthCalendar from './MonthCalendar/MonthCalendar';
import { timeToString} from '../../global/tools';
import Aside from './Aside/aside';
import {MainElement, MainPage } from './main.styles';
import Header from './Header/header';
import { DropDownText } from './Aside/aside.styles';

export type setDaysFormT = {
    user_id: string,
    fulldate: string
}

const Main = () => {
    const user_id = useSelector((state: StateType) => state.userData.user_id)
    const currentDate = useSelector((state : StateType) => state.taskLists.current.date)
    const {month,year,date} = useSelector((state : StateType) => state.taskLists)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [isAsideOpened,closeAside]
        : [a : boolean,b : Function] = useState(false)

    useEffect(() => {
        if (!user_id) return navigate('/login')
        // @ts-ignore
        dispatch(setUserDays({user_id,fulldate : timeToString(year,month,date)}))
    }, [])


    const path = currentDate ? '/day' : '/month'


    return  <MainPage>
        <Header closeAside={() => closeAside(!isAsideOpened)}/>
        <MainElement>
            <Aside isHide={isAsideOpened}/>
            {path == '/day' && <DayCalendar />}
            {path == '/month' && <MonthCalendar />}
        </MainElement>


    </MainPage>
}







export default Main
