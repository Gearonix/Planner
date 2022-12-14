import React, {useEffect, useRef, useState} from 'react';
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
import {IParallax, Parallax, ParallaxLayer} from '@react-spring/parallax'
// @ts-ignore

export type setDaysFormT = {
    user_id: string,
    fulldate: string,
    noCurrent?: boolean
}
export type compValueType = 'createModal' | 'infoModal' | 'editPage' | null
export type mainStatesT = { component: [compValueType, Function], index: [number | null, Function] }

const url = (name: string, wrap = false) =>
    `${wrap ? 'url(' : ''}https://awv3node-homepage.surge.sh/build/assets/${name}.svg${wrap ? ')' : ''}`


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
        const submitData: { user_id: string, fulldate: string } = {user_id, fulldate: generateTodayDate(true)}
        dispatch(setCurrentData(submitData))
        const [year, month] = stringToTime(submitData.fulldate)
        if (year == currentYear && month == currentMonth) return
        // @ts-ignore
        dispatch(setUserDays(submitData))

    }
    const uriPath = currentDate ? '/day' : '/month'
    const states: mainStatesT = {component: [componentName, openComponent], index: [componentIndex, setIndex]}
    const parallax = useRef<IParallax>(null!)
    const toMonth = () => parallax?.current?.scrollTo(1)
    const toDay = () => parallax?.current?.scrollTo(0)

    const scrolls = [() => {
        document.removeEventListener('mousewheel', toDay)
        document.addEventListener('mousewheel', toMonth)
        parallax.current.scrollTo(1)
    },
        () => {
            document.removeEventListener('mousewheel', toMonth)
            document.addEventListener('mousewheel', toDay)
            parallax.current.scrollTo(0)
        }]

    return <MainPage className={'dragableMain'}>
        <Header closeAside={() => closeAside(!isAsideOpened)} states={states}/>
        <MainElement style={{width: '100%', height: '100%', background: '#253237'}}>
            <Parallax ref={parallax} pages={2} config={{mass: 1, tension: 380, friction: 60}}>
                <ParallaxLayer
                    offset={0}
                    speed={0.1}
                    style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        justifyContent: 'center',
                        height: '100%',
                        width: '100%',
                        position: 'absolute',
                    }}>
                    <DayCalendar states={states} toToday={toToday} scrollTo={scrolls[0]}/>
                </ParallaxLayer>
                <ParallaxLayer
                    offset={1}
                    speed={0.1}
                    style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        height: '100%',
                        width: '100%',
                        position: 'absolute',
                    }}>
                    <MonthCalendar toToday={toToday} states={states} scrollTo={scrolls[1]}/>
                </ParallaxLayer>

            </Parallax>

            <Aside isHide={isAsideOpened} states={states}/>

        </MainElement>


    </MainPage>
}


export default Main
