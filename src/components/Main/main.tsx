import React, {useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from "react-redux";
import {StateType} from '../../global/store';
import {setUserDays} from "../../reducers/tasksListReducer";
import DayCalendar from './DayCalendar/dayCalendar';
import MonthCalendar from './MonthCalendar/MonthCalendar';


export type setDaysFormT = {
    user_id: string,
    fulldate?: string
}

const Main = () => {
    const user_id = useSelector((state: StateType) => state.userData.user_id)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    useEffect(() => {
        if (!user_id) return navigate('/login')
        // @ts-ignore
        dispatch(setUserDays({user_id}))

    }, [])

    const testing = false

    return <><Link to={'/users/me'}>to profile</Link>
        <div></div>
        {testing ? <DayCalendar/> : <MonthCalendar/>}

    </>
}







export default Main
