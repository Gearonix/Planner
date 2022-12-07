import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import {getArrayByC} from "../../global/tools";
import MenuItem from "@mui/material/MenuItem";
import React from "react";
import TextField from "@mui/material/TextField";
import {DesktopDatePicker} from "@mui/x-date-pickers/DesktopDatePicker";
import {Dayjs} from "dayjs";


type dropDownType = {
    handler : any,
    minWidth ?: number,
    value : number,
    names : Array<string>
}

export const DropDownC = ({handler,minWidth=120, value,names} : dropDownType) =>
    <FormControl sx={{ m: 1, minWidth }} size="small"
                 variant={'standard'}>
        <Select
            labelId="demo-simple-select-small"
            id="demo-select-small"
            value={value}
            label="Time"
            onChange={handler}
            sx={{marginLeft: '-0px'}}
        >
            {names.map((i,idx) => <MenuItem value={idx.toString()} key={idx}>{i}</MenuItem>)}
        </Select>
    </FormControl>


type datePickerType = {
    date : Dayjs,
    handleDate : any
}

export const DatePicker = ({date,handleDate} : datePickerType) => <DesktopDatePicker
    label="Choose date"
    inputFormat="DD/MM/YYYY"
    value={date} onChange={handleDate}
    renderInput={(params) => <TextField size={'small'} {...params} />}/>


export const TextArea = ({desc,setDesc} : {desc : string,setDesc : any}) => <TextField
    id="filled-multiline-flexible"
    label="Description..."
    multiline
    maxRows={2}
    value={desc}
    onChange={setDesc}
    variant="filled"
    sx={{marginTop: '10px'}}
/>
