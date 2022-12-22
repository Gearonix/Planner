import React from "react";
import Select, {SelectChangeEvent} from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import {capitalizeFirstLetter} from "../../../utils/tools";
import dayjs, {Dayjs} from "dayjs";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DesktopDatePicker} from "@mui/x-date-pickers/DesktopDatePicker";
import TextField from "@mui/material/TextField";
import {StaticDatePicker} from "@mui/x-date-pickers/StaticDatePicker";

export type dropDownType = {
    handler: any,
    minWidth?: number,
    value: any,
    names: Array<string>,
    formVariant?: "standard" | "outlined" |
        "filled" | undefined,
    title?: string,
    css?: any,
    Component?: any
}
export const DropDownC: React.FC<dropDownType> = (props) => {
    const Element = props.Component || Select
    return <FormControl sx={{m: 1, minWidth: props.minWidth || 120}} size="small"
                        variant={props.formVariant}>
        {props.title && <InputLabel id="demo-simple-select-filled-label">{props.title}</InputLabel>}
        <Element
            labelId="demo-simple-select-small"
            id="demo-select-small"
            value={props.names.indexOf(props.value)}
            label="Time"
            onChange={(idx: SelectChangeEvent<number>) => {
                props.handler(props.names[idx.target.value as number])
            }}
            sx={{marginLeft: '-0px', ...props.css}}
        >
            {props.names.map((i, idx) => <MenuItem value={idx.toString()}
                                                   key={idx}>{capitalizeFirstLetter(i)}</MenuItem>)}
        </Element>
    </FormControl>
}

export type inputDatePickerT = {
    date: Dayjs,
    handleDate: any,
    disabled?: boolean
}

export const InputDatePicker = ({date, handleDate, disabled}: inputDatePickerT) => <LocalizationProvider
    dateAdapter={AdapterDayjs}>
    <DesktopDatePicker
        label="Choose date"
        inputFormat="DD/MM/YYYY"
        value={date} onChange={handleDate}
        disabled={disabled}

        renderInput={(params) => <TextField size={'small'} {...params}
        />}/>
</LocalizationProvider>

export type DatePickerT = {
    value: Dayjs | null,
    handleDate: (value: Dayjs) => void
}


export const DatePicker = ({value, handleDate}: DatePickerT) => {
    return <StaticDatePicker onChange={(value: Dayjs | null) => handleDate(value || dayjs())}
                             displayStaticWrapperAs="desktop" openTo="day"
                             value={value} renderInput={(params) => <TextField {...params} />}/>
}
