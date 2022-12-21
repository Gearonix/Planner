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
import {StaticDatePicker} from "@mui/x-date-pickers/StaticDatePicker";


type dropDownType = {
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
                // @ts-ignore
                props.handler(props.names[idx.target.value])
            }}
            sx={{marginLeft: '-0px', ...props.css}}
        >
            {props.names.map((i, idx) => <MenuItem value={idx.toString()}
                                                   key={idx}>{capitalizeFirstLetter(i)}</MenuItem>)}
        </Element>
    </FormControl>
}


type inputDatePickerT = {
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


type DatePickerT = {
    value: Dayjs | null,
    handleDate: (value: Dayjs) => void
}
// @ts-ignore
export const DatePicker = ({value, handleDate}: DatePickerT) => <StaticDatePicker onChange={handleDate}
                                                                                  displayStaticWrapperAs="desktop"
                                                                                  openTo="day"
                                                                                  value={value}
                                                                                  renderInput={(params) =>
                                                                                      <TextField {...params} />}
/>


type TextAreaProps = {
    desc: string, setDesc: any,
    css?: any
}

export const TextArea = ({desc, setDesc, css = {maxLength: 55}}: TextAreaProps) => <TextField
    id="filled-multiline-flexible"
    placeholder="Description..."
    multiline
    maxRows={2}
    value={desc}
    onChange={setDesc}
    inputProps={{style: css}}
    variant="filled"
    sx={{padding: 0, border: 'none', marginLeft: '-10px'}}
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
    label?: string,
    css?: any,
    variant?: 'standard',
    fw?: boolean,
    onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>,
    value: string,
    error?: string | boolean,
    placeholder?: string
}


export const Input = (props: InputProps) => {
    return <TextField onChange={props.onChange}
                      id={props.id}
                      label={props.label || ''}
                      type="text"
                      autoComplete="off"
                      variant={props.variant}
                      fullWidth={props.fw}
                      InputProps={{style: props.css}}
                      InputLabelProps={{style: props.css}}
                      value={props.value}
                      error={!!props.error}
                      placeholder={props.placeholder || ''}
    />
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

export const ColorPicker = ({handler, isDark = false}: { handler: Function, isDark?: boolean }) =>
    <ColorWrapper isDark={isDark}>
        <TwitterPicker colors={Object.values(taskColors).map(({color}) => color)}
                       onChangeComplete={({hex}: any) => handler(convertHexToAppColor(hex))}/>
    </ColorWrapper>
