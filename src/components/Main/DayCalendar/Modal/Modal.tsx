import Button from '@mui/material/Button/Button'
import React, {useState} from 'react'
import {ButtonsContainer, ModalElement, TimeWrapper, ModalWrapper, TaskImage, SendButtonsWrapper, ModalDraggable, ColorWrapper, ComponentError } from './Modal.styles'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import  dayjs,{ Dayjs } from 'dayjs';
import {BiCloudUpload} from 'react-icons/bi'
import {DatePicker, DropDownC, TextArea} from '../../../others/components';
import Draggable from "react-draggable";
import {AiOutlineClose} from 'react-icons/ai'
import {useFormik} from "formik";
import {capitalizeFirstLetter, convertHexToAppColor, getArrayByC, numberTimeToStr, timeToString} from "../../../../global/tools";
import {repetitionDelays, taskColors} from "../../../../global/constants";
import {isFileImage, modalValidator } from '../../../../global/validate';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import TextField from '@mui/material/TextField';
import {useDispatch, useSelector} from "react-redux";
import {StateType} from "../../../../global/store";
import { TwitterPicker } from 'react-color';
import {FaGripLines} from 'react-icons/fa'
import {taskType} from "../../../../global/types";
import { createTask } from '../../../../reducers/tasksListReducer';
import {uploadFile} from "../../../../reducers/userDataReducer";

type dayModalProps = {
    close : Function,
    index : number | null
}

export type modalFormType = {
    title : string,
    starts : number,
    ends : number,
    taskBackground : any,
    date : string,
    color : string,
    description : string,
    repetitionDelay : number
}

export type taskToServerType = {
    data : taskType,
    user_id : string
}



dayjs.extend(customParseFormat)


const DayModal = ({close,index} : dayModalProps) => {
    const {date, year,month} = useSelector((state: StateType) => state.taskLists.current)
    const user_id  = useSelector((state : StateType) => state.userData.user_id)
    const fulldate = timeToString(year as string,month as string,date as string)
    index = index || 0
    const [isTask,setIsTask] = useState<boolean>(true)
    const [dayjsDate,setDate] = useState<Dayjs>(dayjs(year+'-'+month+'-'+date))
    const [background,setBackground] = useState<any>(null)
    const [componentError,setCompError] = useState<string | null>(null)
    const [taskColor,setColor] = useState<string>('blue')
    const startHoursArray : Array<any> = [...getArrayByC(24).map(numberTimeToStr),'0:00']
    const [endsHoursArray,setHoursArray] = useState<Array<string>>(
        startHoursArray.slice(index + 1))
    const dispatch = useDispatch()


    const submitTask = async (data : modalFormType) => {
        if (!dayjsDate.isValid())  return  setCompError('Invalid date')

        let filename = null
        if (background){
            isFileImage(background)

            if (!isFileImage(background)) return  setCompError('Invalid background')
            // @ts-ignore
            const {payload} = await dispatch(uploadFile({file : background,name : 'task_backgrounds'}))
            filename = payload
        }
        const submitData : taskType = {...data, taskBackground : filename, isTask,
            starts : numberTimeToStr(data.starts), date : dayjsDate.format('YYYY-MM-DD'),
            ends : endsHoursArray[+data.ends], repetitionDelay : repetitionDelays[+data.repetitionDelay],
            color: taskColor,task_id : null}
        // @ts-ignore
        dispatch(createTask({user_id,data : submitData}))
        close()

    }
    const initialValues : modalFormType  = {
        title : '', starts : index, ends : 0, taskBackground : null, date : fulldate,
        color: 'blue', description : '',
        repetitionDelay : 1}
    const {values,handleChange,handleSubmit,errors} =
        useFormik({initialValues,onSubmit : submitTask,
    validate: modalValidator})

    return <Draggable handle={'.draggableModalHandler'} bounds={'.dragableMain'}
                      defaultPosition={{x : 500, y : 100 }}>
        <ModalElement isBackground={!!background}>
            <ModalDraggable className={'draggableModalHandler'}>
                <FaGripLines style={{color: '#CECECE'}}/>
                {/*@ts-ignore*/}
                <AiOutlineClose style={{cursor: "pointer"}} onClick={close}/>
            </ModalDraggable>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <ModalWrapper w={80}>
                    <TextField error={!!errors.title}
                        id="standard-basic" label="Add Title" variant="standard"
                        size={'small'} sx={{width: '80%',marginTop: '15px',marginBottom: '5px'}}
                        placeholder={'Add Title'} autoComplete={'off'} value={values.title} onChange={handleChange('title')}/>

                    <ButtonsContainer>
                        <Button variant={isTask ? "contained" : "text"} size={'small'}
                                    sx={{marginRight : '10px'}} onClick={() => setIsTask(true)}>Task</Button>
                        <Button variant={!isTask ? "contained" : "text"} size={'small'} onClick={() => setIsTask(false)}>Reminder</Button>
                    </ButtonsContainer>

                    <TimeWrapper>
                        <DatePicker date={dayjsDate} handleDate={(date : Dayjs) => setDate(date)}/>

                        <ButtonsContainer w={120}>
                            <DropDownC  handler={(e : any) => {
                                const value : string = e.target.value
                                handleChange('starts')(value)
                                setHoursArray(startHoursArray.slice(+value + 1))
                            }} value={values.starts}
                                        names={getArrayByC(24).map(numberTimeToStr)}/>
                            <DropDownC handler={handleChange('ends')} value={values.ends}
                                       names={endsHoursArray}/>
                        </ButtonsContainer>

                        <ButtonsContainer w={120}>
                            <DropDownC  handler={handleChange('repetitionDelay')}
                                       minWidth={200} value={values.repetitionDelay}
                                        names={repetitionDelays.map(i => capitalizeFirstLetter(i))}/>
                        </ButtonsContainer>

                        <TextArea desc={values.description} setDesc={handleChange('description')}/>

                        <Button variant="outlined"
                                component="label" startIcon={<BiCloudUpload/>}
                        size={'small'} sx={{marginTop : '15px'}}>Upload <input type="file" hidden
                            onChange={(e : React.BaseSyntheticEvent) => {setBackground(e.target?.files?.[0])}}/></Button>

                        {background && <TaskImage src={URL.createObjectURL(background)}/>}

                        <ColorWrapper>
                            <TwitterPicker colors={Object.values(taskColors).map(({color}) => color)}
                               onChangeComplete={({hex} : any)  =>  setColor(convertHexToAppColor(hex))}/>
                        </ColorWrapper>

                        <ComponentError>{componentError}</ComponentError>
                            <SendButtonsWrapper>
                            <ButtonsContainer w={80} jc={'flex-end'}>
                                {/*@ts-ignore*/}
                                <Button  onClick={close}
                                         variant="outlined" size={'small'}
                                sx={{width : '120px',marginRight : '10px'}} color={'info'}>Cancel</Button>
                                {/*@ts-ignore*/}
                                <Button onClick={handleSubmit}
                                variant="contained" size={'small'}
                                    sx={{marginRight : '10px',width : '120px'}} >Save</Button>
                            </ButtonsContainer>
                        </SendButtonsWrapper>

                    </TimeWrapper>
                </ModalWrapper>

            </LocalizationProvider>

    </ModalElement>
    </Draggable>
}

export default DayModal
