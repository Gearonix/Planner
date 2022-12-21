import React, {useContext, useEffect, useState} from 'react'
import {AddButton, AddButtonBlock, AsideElement, DatePickerWrapper,} from './aside.styles'
import {useDispatch, useSelector} from "react-redux";
import {setCurrentData, setUserDays} from "../../reducers/tasksListReducer";
import './calendar.css'
import {HiOutlinePlus} from 'react-icons/hi'
import {actions, MainContext} from "../Main/reducer";
import Selectors from "../../helpers/selectors";
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, {Dayjs} from 'dayjs';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import {Checkbox, FormControlLabel, FormGroup} from "@mui/material";
import {DatePicker} from '../others/components';
import {DATE_FORMAT} from "../../global/constants";
import {DispatchType} from "../../global/store";

const Aside = () => {
    const dispatch = useDispatch<DispatchType>()
    const {month: stateMonth, year: stateYear} = useSelector(Selectors.taskLists)
    const {date} = useSelector(Selectors.current)
    const user_id = useSelector(Selectors.userId) || ''
    const context = useContext(MainContext)
    const mainState = context.state

    const [datePickerValue, setDateValue] = useState<Dayjs>(dayjs());
    const [filterValues, setFilterValues] = useState<{ tasks: boolean, reminders: boolean }>
    ({tasks: false, reminders: false})

    useEffect(() => {
        setDateValue(dayjs().set('date', Number(date)))
    }, [date])

    const setAnotherMonth = (dateObject: Dayjs) => {
        const fulldate = dateObject.format(DATE_FORMAT)
        const [selectedYear, selectedMonth] = fulldate.split('-')
        setDateValue(dateObject)

        if (selectedMonth == stateMonth && selectedYear == stateYear) {
            return dispatch(setCurrentData({user_id, fulldate}))
        }
        dispatch(setUserDays({user_id, fulldate}))
    }

    const DropDownChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilterValues({...filterValues, [e.target.name]: e.target.checked})
    }


    return <AsideElement isHide={!mainState.isAsideOpened}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <AddButtonBlock>
                <AddButton variant="outlined" size={'large'}
                           startIcon={<HiOutlinePlus style={{color: 'white'}}/>} onClick={() => {
                    context.dispatch(actions.openModal('createModal'))
                    context.dispatch(actions.setIndex(6))
                }}>Add Event</AddButton>
            </AddButtonBlock>
            <DatePickerWrapper>
                <DatePicker value={datePickerValue} handleDate={setAnotherMonth}/>
            </DatePickerWrapper>
            <FormControl sx={{m: 3}} component="fieldset" variant="standard">
                <FormLabel component="legend" sx={{color: 'white'}}>Calendar Filter</FormLabel>
                <FormGroup>
                    <FormControlLabel
                        control={
                            <Checkbox checked={filterValues.tasks} onChange={DropDownChange}
                                      sx={{color: 'white'}} name={'tasks'}/>
                        }
                        label="Tasks"
                        sx={{color: 'white'}}
                    />
                    <FormControlLabel
                        control={
                            <Checkbox checked={filterValues.reminders} onChange={DropDownChange}
                                      sx={{color: 'white'}} name={'reminders'}/>
                        }
                        label="Reminders"
                        sx={{color: 'white'}}
                    />
                </FormGroup>
            </FormControl>
        </LocalizationProvider>
    </AsideElement>
}


export default Aside
