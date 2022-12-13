import React, {useState} from 'react'
import {
    AddButtonBlock,
    AsideElement,
    CalendarWrapper,
    CheckBox,
    DropDownBody,
    DropDownBodyT,
    DropDownHeader,
    DropDownText,
    HiddenCheckBox
} from './aside.styles'
// @ts-ignore
import Calendar from 'react-calendar';
import {useDispatch, useSelector} from "react-redux";
import {StateType} from "../../global/store";
import {formatMonth, formatNum, timeToString} from "../../helpers/tools";
import {setCurrentData, setUserDays} from "../../reducers/tasksListReducer";
import {AiOutlineArrowDown, AiOutlineArrowUp} from 'react-icons/ai'
import './CalendarComp/calendar.css'
import {HiOutlinePlus} from 'react-icons/hi'
import Button from '@mui/material/Button';
import {mainStatesT} from "../Main/main";

const Aside = ({isHide, states}: { isHide: boolean, states: mainStatesT }) => {
    const {component: [componentName, openComponent], index: [componentIndex, setIndex]} = states
    const dispatch = useDispatch()
    const {month: stateMonth, year: stateYear, date} = useSelector((state: StateType) => state.taskLists)
    const [calendarDate, setCalendarDate] = useState(new Date(+stateYear, +stateMonth - 1, +date))
    const user_id = useSelector((state: StateType) => state.userData.user_id) || ''
    const [isDropDown, showDropDown] = useState(false)
    const setAnotherMonth = (dateObject: any) => {
        const [selectedYear, selectedMonth, day] = [formatNum(dateObject.getFullYear()),
            formatMonth(dateObject.getMonth()), formatNum(dateObject.getDate())]
        const fulldate = timeToString(selectedYear, selectedMonth, day)
        setCalendarDate(dateObject)
        if (selectedMonth == stateMonth && selectedYear == stateYear) {
            dispatch(setCurrentData({user_id,fulldate}))
            return
        }
        // @ts-ignore
        dispatch(setUserDays({user_id,fulldate}))
    }
    const minDate = new Date(+stateYear - 8, +stateMonth - 1)
    const maxDate = new Date(+stateYear + 8,+stateMonth - 1)



    return  <AsideElement isHide={isHide}>
        <AddButtonBlock>
            <Button variant="outlined" size={'large'}
                    startIcon={<HiOutlinePlus style={{color: '#1976d2'}}/>}
                    sx={{marginLeft: '10px'}} onClick={() => {
                openComponent('createModal')
                setIndex(6)
            }}>Add Event</Button>
        </AddButtonBlock>
        <CalendarWrapper>
            <Calendar onChange={setAnotherMonth}
                      value={calendarDate}
                      minDate={minDate}
                      maxDate={maxDate}
                      maxDetail={'month'}
                      minDetail={'decade'}
                      onClickMonth={() => console.log('test')}
            />
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
