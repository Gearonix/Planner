import React from 'react'
import {AddButton, AddButtonBlock, AsideElement, DatePickerWrapper} from "../aside.styles";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {HiOutlinePlus} from "react-icons/hi";
import {mainStateT} from '../../Main/others/mainTypes';
import {Dayjs} from "dayjs";
import {ChangeEventT} from "../../../types/appTypes";
import {DatePicker} from "../../others/materialUI/datepicker";
import {CheckBoxes} from '../../others/materialUI/buttonsAndInputs';
import {useTranslation} from "react-i18next";


type asideRenderT = {
    mainState: mainStateT,
    pickDate: (dateObject: Dayjs) => void,
    filterValues: {
        tasks: boolean,
        reminders: boolean
    },
    dropDownChange: (e: ChangeEventT) => void,
    datePickerValue: Dayjs | null,
    addEvent: () => void,
}


const AsideRender: React.FC<asideRenderT> = (props) => {
    const {
        dropDownChange, filterValues, pickDate,
        datePickerValue, addEvent
    } = props
    const {t} = useTranslation()

    return <AsideElement>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <AddButtonBlock>
                <AddButton variant="outlined" size={'large'}
                           startIcon={<HiOutlinePlus style={{color: 'white'}}/>}
                           onClick={addEvent}>{t('addEvent')}</AddButton>
            </AddButtonBlock>
            <DatePickerWrapper>
                <DatePicker value={datePickerValue} handleDate={pickDate}/>
            </DatePickerWrapper>
            <CheckBoxes filterValues={filterValues} handler={dropDownChange}/>
        </LocalizationProvider>
    </AsideElement>
}


export default AsideRender
