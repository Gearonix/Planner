import React, {useEffect, useReducer, useRef} from 'react';
import {useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from "react-redux";
import {DispatchType} from '../../setup/store';
import {setUserDays} from "../../setup/reducers/tasksListReducer";
import DayCalendar from './components/DayCalendar/dayCalendar';
import MonthCalendar from './components/MonthCalendar/monthCalendar';
import Aside from '../Aside/aside';
import {BackgroundLayer, Layer, MainPage} from './others/main.styles';
import Header from '../Header/header';
import {IParallax, Parallax} from '@react-spring/parallax'
import {actions, initialState, MainContext, mainReducer} from "./utils/reducer";
import Selectors from '../../helpers/selectors';
import Animations from '../../helpers/animations';
import {mainContextType, modalComponentT} from "./others/mainTypes";
import {SpaceBackground} from "../others/SpaceBackground/spaceBackground";
import {useScrolls} from "./utils/utils";
import {isItLaptop} from "../../utils/tools";


const Main = () => {
    const user_id = useSelector(Selectors.userId)
    const selectedDate = useSelector(Selectors.selectedDate)
    const navigate = useNavigate()
    const dispatch = useDispatch<DispatchType>()
    const [mainState, mainDispatch] = useReducer(mainReducer, initialState)
    const parallax = useRef<IParallax>(null!)
    const scrolls = useScrolls(parallax)


    useEffect(() => {
        if (!user_id) {
            navigate('/login')
        }
        if (isItLaptop()) {
            navigate('/about')
        }
    }, [user_id])


    useEffect(() => {
        dispatch(setUserDays(selectedDate))
    }, [])

    const openModal = (idx: number, name: modalComponentT) => {
        mainDispatch(actions.openModal(name))
        mainDispatch(actions.setIndex(idx))
        mainDispatch(actions.animate(true))
    }
    const closeModal = () => {
        mainDispatch(actions.setIndex(null))
        mainDispatch(actions.openModal(null))
    }


    const contextValues: mainContextType = {
        state: mainState, scrolls,
        dispatch: mainDispatch,
        openModal, closeModal
    }
    return !isItLaptop() ? <MainContext.Provider value={contextValues}>
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
                    <BackgroundLayer offset={0.5} speed={1} style={{
                        background: '#292929', zIndex: 0
                        , opacity: 0.7
                    }}/>
                </Parallax>
                <Aside/>
            </SpaceBackground>

        </MainPage>
    </MainContext.Provider> : null
}


export default Main
