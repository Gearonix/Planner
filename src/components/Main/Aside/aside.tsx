import React, {useState} from 'react'
import {AddButton, AddButtonBlock, AddButtonText, AsideElement, HiddenCheckBox, DropDownBody, DropDownHeader, DropDownText, CheckBox, DropDownBodyT, CalendarWrapper} from './aside.styles'
// @ts-ignore
import Calendar from 'react-calendar';
import {useDispatch, useSelector} from "react-redux";
import {StateType} from "../../../global/store";
import {formatMonth, normalizeNumber, timeToString} from "../../../global/tools";
import {setCurrentData, setUserDays} from "../../../reducers/tasksListReducer";
import { PasswordButton } from '../../Profile/profile.styles';
import {BsFillPlusCircleFill} from 'react-icons/bs'
import {AiOutlineArrowUp,AiOutlineArrowDown} from 'react-icons/ai'


const Aside = ({isHide} : {isHide : boolean}) => {
    const dispatch = useDispatch()
    const {month: stateMonth,year: stateYear} = useSelector((state : StateType) => state.taskLists)
    const [calendarDate,setCalendarDate] = useState(new Date(+stateYear,+stateMonth - 1))
    const user_id  = useSelector((state : StateType) => state.userData.user_id) || ''
    const [isDropDown,showDropDown] = useState(false)
    const setAnotherMonth = (dateObject : any) => {
        const [selectedYear,selectedMonth,day] = [normalizeNumber(dateObject.getFullYear()),
            formatMonth(dateObject.getMonth()),normalizeNumber(dateObject.getDate())]
        const fulldate = timeToString(selectedYear,selectedMonth,day)
        setCalendarDate(dateObject)
        if (selectedMonth == stateMonth && selectedYear == stateYear) {
            dispatch(setCurrentData({user_id,fulldate}))
            return
        }
        // @ts-ignore
        dispatch(setUserDays({user_id,fulldate}))
    }

    return  <AsideElement isHide={isHide}>
        <AddButtonBlock>
            <AddButton>
                <BsFillPlusCircleFill
                    style={{color : '#444444'
                        ,width : 20,height: 20}}/>
                <AddButtonText>
                    Add Task
                </AddButtonText>
            </AddButton>
        </AddButtonBlock>
        <CalendarWrapper>
            <Calendar onChange={setAnotherMonth} value={calendarDate}/>
        </CalendarWrapper>

        <DropDownHeader onClick={() => showDropDown(!isDropDown)}>
            <DropDownText>Filter</DropDownText>

                {isDropDown ? <AiOutlineArrowUp/>:
        <AiOutlineArrowDown/>}

        </DropDownHeader>
         <><DropDownBody hide={isDropDown}>
            <HiddenCheckBox type={'checkbox'} value={'test1'}/>
            <CheckBox/>
            <DropDownBodyT>Tasks</DropDownBodyT>
        </DropDownBody>
            <DropDownBody hide={isDropDown}>
            <HiddenCheckBox type={'checkbox'} value={'test2'}/>
            <CheckBox/>
            <DropDownBodyT>Reminders</DropDownBodyT>
            </DropDownBody>
        </>


    </AsideElement>
}



export default Aside
