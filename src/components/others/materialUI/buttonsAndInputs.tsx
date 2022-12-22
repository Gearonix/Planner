import React, {ChangeEventHandler, useEffect, useState} from "react";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import CheckboxMui from "@mui/material/Checkbox";
import {Checkbox, FormGroup, LinearProgress, LinearProgressProps} from "@mui/material";
import Button from "@mui/material/Button";
import {BiCloudUpload} from "react-icons/bi";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import {ChangeEventT} from "../../../types/appTypes";


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
            p => p === 100 ? 0 : Math.min(p + Math.random() * 10, 100)), 500)
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

type checkBoxesT = {
    filterValues: {
        tasks: boolean,
        reminders: boolean
    },
    handler: (e: ChangeEventT) => void
}

export const CheckBoxes: React.FC<checkBoxesT> = ({filterValues, handler}) => {
    return <FormControl sx={{m: 3}} component="fieldset" variant="standard">
        <FormLabel component="legend" sx={{color: 'white'}}>Calendar Filter</FormLabel>
        <FormGroup>
            <FormControlLabel
                control={
                    <Checkbox checked={filterValues.tasks} onChange={handler}
                              sx={{color: 'white'}} name={'tasks'}/>
                }
                label="Tasks"
                sx={{color: 'white'}}
            />
            <FormControlLabel
                control={
                    <Checkbox checked={filterValues.reminders} onChange={handler}
                              sx={{color: 'white'}} name={'reminders'}/>
                }
                label="Reminders"
                sx={{color: 'white'}}
            />
        </FormGroup>
    </FormControl>
}
