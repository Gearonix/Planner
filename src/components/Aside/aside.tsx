import React, {useContext} from 'react'
import {useDispatch, useSelector} from "react-redux";
import './others/lib.css'
import {actions, MainContext} from "../Main/utils/reducer";
import Selectors from "../../helpers/selectors";
import {Dayjs} from 'dayjs';
import {DispatchType} from "../../setup/store";
import {ChangeEventT} from '../../types/appTypes';
import AsideRender from "./others/asideRender";
import {setDate, setUserDays} from '../../setup/reducers/tasksListReducer';
import {convertToDate, convertToDayJs, isDateInThisMonth} from '../../utils/tools';
import {taskFilterT} from '../Main/others/mainTypes';

const Aside = () => {
    const dispatch = useDispatch<DispatchType>()
    const selectedDate = useSelector(Selectors.selectedDate)

    const context = useContext(MainContext)
    const mainState = context.state

    const pickDate = (dateObject: Dayjs) => {
        context.closeModal()
        context.dispatch(actions.animateComponent(true))
        const date = convertToDate(dateObject)
        dispatch(setDate(date))
        context.dispatch(actions.switchRange('date'))
        if (!isDateInThisMonth(selectedDate, date)) dispatch(setUserDays(date))
    }

    const addEvent = () => context.openModal(6, 'createModal')

    const DropDownChange = (e: ChangeEventT) => {
        const filter: taskFilterT = {...mainState.filter, [e.target.name]: e.target.checked}
        context.dispatch(actions.setFilter(filter))
    }


    return <AsideRender datePickerValue={convertToDayJs(selectedDate)} dropDownChange={DropDownChange}
                        filterValues={mainState.filter} mainState={mainState} pickDate={pickDate} addEvent={addEvent}/>
}


export default Aside
