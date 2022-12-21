import React, {useEffect, useReducer, useRef} from 'react';
import {useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from "react-redux";
import {DispatchType} from '../../global/store';
import {setCurrentData, setUserDays} from "../../reducers/tasksListReducer";
import DayCalendar from './DayCalendar/dayCalendar';
import MonthCalendar from './MonthCalendar/monthCalendar';
import {timeToString,} from '../../helpers/tools';
import Aside from '../Aside/aside';
import {Layer, MainPage} from './main.styles';
import Header from '../Header/header';
import {IParallax, Parallax} from '@react-spring/parallax'
import {initialState, MainContext, mainReducer} from "./reducer";
import Selectors from '../../helpers/selectors';
import dayjs from "dayjs";
import {DATE_FORMAT} from "../../global/constants";
import {useScrolls} from '../../helpers/hooks';
import Animations from '../../helpers/animations';
import {mainContextType, toTodayT} from "../../global/types/components/mainTypes";
import {SpaceBackground} from "../others/SpaceBackground/spaceBackground";


const Main = () => {
    const user_id: string = useSelector(Selectors.userId) as string
    const {month: currentMonth, year: currentYear, date: date} = useSelector(Selectors.taskLists)
    const {date: currentDate} = useSelector(Selectors.current)
    const navigate = useNavigate()
    const dispatch = useDispatch<DispatchType>()
    const [mainState, mainDispatch] = useReducer(mainReducer, initialState)

    useEffect(() => {
        if (!user_id) return navigate('/login')
        dispatch(setUserDays({user_id: user_id, fulldate: timeToString(currentYear, currentMonth, date)}))
    }, [])

    const toToday = (animate ?: (count: 1 | -1) => void) => {
        const date = dayjs()
        const submitData: toTodayT = {user_id, fulldate: date.format(DATE_FORMAT)}
        dispatch(setCurrentData(submitData))

        const [year, month] = [date.format('YYYY'), date.format('MM')]
        if (year == currentYear && month == currentMonth) {
            if (animate) {
                if (date.get('date') == Number(currentDate)) return
                animate(date.get('date') > Number(currentDate) ? 1 : -1)
            }
            return
        }
        dispatch(setUserDays(submitData))


    }

    const parallax = useRef<IParallax>(null!)
    const scrolls = useScrolls(parallax)

    const contextValues: mainContextType = {
        state: mainState, scrolls,
        dispatch: mainDispatch, toToday
    }

    return <MainContext.Provider value={contextValues}>
        <MainPage>
            <Header/>
            <SpaceBackground>
                <Parallax ref={parallax} pages={2} config={Animations.parallax}>
                    <Layer
                        offset={0}
                        speed={0.1}>
                        <DayCalendar/>
                    </Layer>
                    <Layer
                        offset={1}
                        speed={0.1}>
                        <MonthCalendar/>
                    </Layer>
                </Parallax>
                <Aside/>
            </SpaceBackground>

        </MainPage>
    </MainContext.Provider>
}


export default Main
