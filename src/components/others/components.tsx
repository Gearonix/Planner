import FormControl from "@mui/material/FormControl";
import Select, {SelectChangeEvent} from "@mui/material/Select";
import {capitalizeFirstLetter, convertHexToAppColor} from "../../helpers/tools";
import MenuItem from "@mui/material/MenuItem";
import React, {ChangeEventHandler, useEffect, useState} from "react";
import TextField from "@mui/material/TextField";
import {DesktopDatePicker} from "@mui/x-date-pickers/DesktopDatePicker";
import {Dayjs} from "dayjs";
import InputLabel from "@mui/material/InputLabel";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import FormControlLabel from "@mui/material/FormControlLabel";
import CheckboxMui from "@mui/material/Checkbox";
import {LinearProgress, LinearProgressProps} from "@mui/material";
import Button from "@mui/material/Button";
import {BiCloudUpload} from "react-icons/bi";
import {TwitterPicker} from "react-color";
import {taskColors} from "../../global/constants";
import {ColorWrapper} from "./Modals/modalWrapper/createTaskModal/CreateModal.styles";


type dropDownType = {
    handler: any,
    minWidth?: number,
    value: any,
    names: Array<string>,
    formVariant?: "standard" | "outlined" |
        "filled" | undefined,
    title?: string,
    css?: any
}

export const DropDownC = ({
                              handler, minWidth = 120, value, names, formVariant,
                              title, css = {}
                          }: dropDownType) =>
    <FormControl sx={{m: 1, minWidth}} size="small"
                 variant={formVariant}>
        {title && <InputLabel id="demo-simple-select-filled-label">{title}</InputLabel>}
        <Select
            labelId="demo-simple-select-small"
            id="demo-select-small"
            value={names.indexOf(value)}
            label="Time"
            onChange={(idx: SelectChangeEvent<number>) => {
                // @ts-ignore
                handler(names[idx.target.value])
            }}
            sx={{marginLeft: '-0px', ...css}}
        >
            {names.map((i, idx) => <MenuItem value={idx.toString()} key={idx}>{capitalizeFirstLetter(i)}</MenuItem>)}
        </Select>
    </FormControl>


type datePickerType = {
    date: Dayjs,
    handleDate: any,
    disabled?: boolean
}
export const DatePicker = ({date, handleDate, disabled}: datePickerType) => <LocalizationProvider
    dateAdapter={AdapterDayjs}>
    <DesktopDatePicker
        label="Choose date"
        inputFormat="DD/MM/YYYY"
        value={date} onChange={handleDate}
        disabled={disabled}

        renderInput={(params) => <TextField size={'small'} {...params}
        />}/>
</LocalizationProvider>


type TextAreaProps = {
    desc: string, setDesc: any,
    css?: any
}

export const TextArea = ({desc, setDesc, css = {maxLength: 55}}: TextAreaProps) => <TextField
    id="filled-multiline-flexible"
    label="Description..."
    multiline
    maxRows={2}
    value={desc}
    onChange={setDesc}
    inputProps={{style: css}}
    variant="filled"
    sx={{marginTop: '10px'}}
/>


type CheckBoxProps = {
    title: string,
    checked?: boolean,
    handler?: Function,
    darkMode?: boolean
}

export const CheckBox = ({
                             title, handler = () => {
    }, checked = false, darkMode = false
                         }: CheckBoxProps) => {
    return <FormControlLabel control={<CheckboxMui onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        handler(e.target.checked)
    }} checked={checked}/>} label={title} sx={{color: darkMode ? 'white' : 'black'}}/>
}

type InputProps = {
    id: string,
    label: string,
    css?: any,
    variant?: 'standard',
    fw?: boolean,
    onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>,
    value: string,
    error?: string | boolean
}


export const Input = (props: InputProps) => {
    return <TextField onChange={props.onChange}
                      id={props.id}
                      label={props.label}
                      type="text"
                      autoComplete="off"
                      variant={props.variant}
                      fullWidth={props.fw}
                      InputProps={{style: props.css}}
                      InputLabelProps={{style: props.css}}
                      value={props.value}
                      error={!!props.error}/>
}

export const Progress = ({theme}: { theme: LinearProgressProps['color'] }) => {
    const [progress, setProgress] = useState<number>(0)

    useEffect(() => {
        const interval = setInterval(() => setProgress(
            p => p == 100 ? 0 : Math.min(p + Math.random() * 10, 100)), 500)
        return () => clearInterval(interval)
    }, [])

    return <LinearProgress variant="determinate" value={progress} color={theme}/>
}


type UploadButtonProps = {
    handler: Function,
    size?: "small" | "medium" | "large",
    title?: string
}

export const UploadButton = ({handler, size = 'small', title = 'Upload'}: UploadButtonProps) => {
    return <Button variant="outlined"
                   component="label" startIcon={<BiCloudUpload/>}
                   size={size} sx={{marginTop: '15px'}}>{title}
        <input type="file" hidden onChange={(e: React.BaseSyntheticEvent) =>
            handler(e.target?.files?.[0])}/></Button>
}

export const ColorPicker = ({handler}: { handler: Function }) => <ColorWrapper>
    <TwitterPicker colors={Object.values(taskColors).map(({color}) => color)}
                   onChangeComplete={({hex}: any) => handler(convertHexToAppColor(hex))}/>
</ColorWrapper>
