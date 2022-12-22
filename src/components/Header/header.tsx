import React, {useContext} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {actions, MainContext} from "../Main/utils/reducer";
import Selectors from "../../helpers/selectors";
import {componentNameT} from "../Main/others/mainTypes";
import {DispatchType} from '../../setup/store';
import {useNavigate} from "react-router-dom";
import HeaderRender from './headerRender';
import {convertToDate, convertToDayJs, isDateInThisMonth} from '../../utils/tools';
import {setDate, setUserDays} from '../../setup/reducers/tasksListReducer';
import dayjs from "dayjs";

const Header = () => {
    const selectedDate = useSelector(Selectors.selectedDate)
    const context = useContext(MainContext)
    const navigate = useNavigate()
    const dispatch = useDispatch<DispatchType>()
    const range: componentNameT = context.state.range


    const switchRange = (value: componentNameT) => {
        context.dispatch(actions.switchRange(value))
    }

    const switchDate = (count: -1 | 1) => {
        context.closeModal()
        context.dispatch(actions.animateComponent(true))
        let dayJs = convertToDayJs(selectedDate)
        dayJs = dayJs.set(range, dayJs.get(range) + count)
        const date = convertToDate(dayJs)
        dispatch(setDate(date))

        if (range === 'month' || !isDateInThisMonth(selectedDate, date)) dispatch(setUserDays(date))
    }

    const openAside = () => context.dispatch(actions.setIsAsideOpened(!context.state.isAsideOpened))

    const toToday = () => {
        context.dispatch(actions.animateComponent(true))
        context.closeModal()
        const date = convertToDate(dayjs())
        dispatch(setDate(date))
        if (range === 'month') dispatch(setUserDays(date))
        setIsProfile(false)
    }

    const toAboutPage = () => navigate('/about')

    const setIsProfile = (bool: boolean) => {
        context.dispatch(actions.setIsProfile(bool))
        context.dispatch(actions.switchRange('date'))
    }

    return <HeaderRender toToday={toToday} range={range} openAside={openAside} switchDate={switchDate}
                         switchRange={switchRange} toAboutPage={toAboutPage} selectedDate={selectedDate}
                         setIsProfile={setIsProfile}/>
}


export default Header
