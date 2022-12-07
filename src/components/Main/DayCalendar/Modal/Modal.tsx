import Button from '@mui/material/Button/Button'
import React, {useState} from 'react'
import {ButtonsContainer, ModalInput, ModalElement, TimeWrapper, ModalWrapper
    , TaskImage, SendButtonsWrapper, ModalDraggable } from './Modal.styles'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import  dayjs,{ Dayjs } from 'dayjs';
import { SelectChangeEvent } from '@mui/material/Select';
import {BiCloudUpload} from 'react-icons/bi'
import {DatePicker, DropDownC, TextArea} from '../../../others/components';
import Draggable from "react-draggable";
import {FaRegHandPaper} from 'react-icons/fa'
import {AiOutlineClose} from 'react-icons/ai'
import {refType, taskType} from "../../../../global/types";
import { modalCoordsType } from '../dayCalendar';
import {useFormik} from "formik";
import {
    capitalizeFirstLetter,
    formatMonth,
    formatNum,
    getArrayByC,
    numberTimeToStr,
    strTimeToNumber,
    timeToString
} from "../../../../global/tools";
import {repetitionDelays} from "../../../../global/constants";


type dayModalProps = {
    close : Function,
    coords : modalCoordsType
}

type modalFormType = {
    title : string,
    starts : number,
    ends : number,
    taskBackground : any,
    date : string,
    color : string,
    description : string,
    repetitionDelay : number
}



const DayModal = ({close,coords} : dayModalProps) => {
    const [isTask,setIsTask] = useState<boolean>(true)
    const [dayjsDate,setDate] = useState<Dayjs>(dayjs())
    const [background,setBackground] = useState<any>(null)

    const modalRef : refType = React.createRef()

    const taskData = coords.taskData

    const createTask = (data : modalFormType) => {
        const fulldate = timeToString(formatNum(dayjsDate.get('year')),
        formatMonth(dayjsDate.get('month')),formatNum(dayjsDate.get('date')))

        const submitData = {
            ...data,
            taskBackground : background,
            date : fulldate, isTask,
            starts : numberTimeToStr(data.starts),
            ends : numberTimeToStr(data.ends),
            repetitionDelay : repetitionDelays[+data.repetitionDelay]
        }

        console.log(submitData)
    }

    const initialValues : modalFormType  = {
        title : '', starts : strTimeToNumber(taskData.starts), ends : strTimeToNumber(taskData.ends),
        taskBackground : null, date : taskData.date, color: 'blue', description : '',
        repetitionDelay : 1
    }


    const {values,handleChange,handleSubmit} = useFormik({initialValues,onSubmit : createTask})


    const handleDate = (date : Dayjs) => {
        if (isNaN(date.get('year'))) {
            //error
            return
        }
        setDate(date)
    }


    return <Draggable handle={'.draggableModalHandler'} bounds={'.dragableMain'}
                      defaultPosition={{x : Number(coords.x) - 230 || 0, y : Number(coords.y) - 350 || 0}}>
        <ModalElement isBackground={!!background}>
            <ModalDraggable className={'draggableModalHandler'} ref={modalRef}>
                <FaRegHandPaper style={{color: '#CECECE'}}/>
                {/*@ts-ignore*/}
                <AiOutlineClose style={{cursor: "pointer"}} onClick={close}/>
            </ModalDraggable>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <ModalWrapper w={80}>
                    <ModalInput isPassword={false} placeholder={'Add Title'} name={'title'} onChange={handleChange('title')}
                    value={values.title} autoComplete={'off'} />

                    <ButtonsContainer>
                        <Button variant={isTask ? "contained" : "text"} size={'small'}
                                    sx={{marginRight : '10px'}} onClick={() => setIsTask(true)}>Task</Button>
                        <Button variant={!isTask ? "contained" : "text"} size={'small'} onClick={() => setIsTask(false)}>Reminder</Button>
                    </ButtonsContainer>

                    <TimeWrapper>
                        <DatePicker date={dayjsDate} handleDate={handleDate} />

                        <ButtonsContainer w={120}>
                            <DropDownC  handler={handleChange('starts')} value={values.starts}
                                        names={getArrayByC(24).map(numberTimeToStr)}/>
                            <DropDownC handler={handleChange('ends')} value={values.ends}
                                       names={getArrayByC(24).map(numberTimeToStr)}/>
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
