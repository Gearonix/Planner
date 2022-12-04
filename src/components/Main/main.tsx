import React, {useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from "react-redux";
import {StateType} from '../../global/store';
import {setUserDays} from "../../reducers/tasksListReducer";
import DayCalendar from './DayCalendar/dayCalendar';
import MonthCalendar from './MonthCalendar/MonthCalendar';
import { timeToString} from '../../global/tools';

export type setDaysFormT = {
    user_id: string,
    fulldate: string
}

const Main = () => {
    const user_id = useSelector((state: StateType) => state.userData.user_id)
    const currentDate = useSelector((state : StateType) => state.taskLists.current.date)
    const {month,year} = useSelector((state : StateType) => state.taskLists)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const setDays = (fulldate : string) => {
        // @ts-ignore
        dispatch(setUserDays({user_id,fulldate}))
    }

    useEffect(() => {
        if (!user_id) return navigate('/login')
        setDays(timeToString(year,month,'01'))
    }, [])


    const path = currentDate ? '/day' : '/month'


    return  <><Link to={'/users/me'}>to profile</Link>
        <div></div>
        {path == '/day' && <DayCalendar />}
        {path == '/month' && <MonthCalendar loadMonth={setDays}/>}

    </>
}







export default Main
