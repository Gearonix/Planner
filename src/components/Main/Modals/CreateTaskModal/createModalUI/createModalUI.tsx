import dayjs, {Dayjs} from "dayjs";
import Draggable from "react-draggable";
import {
    ButtonsContainer, ComponentError,
    ModalDraggable,
    ModalElement,
    ModalWrapper, SendButtonsWrapper,
    TaskImage,
    TimeWrapper
} from "../CreateModal.styles";
import {FaGripLines} from "react-icons/fa";
import {AiOutlineClose} from "react-icons/ai";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button/Button";
import {ColorPicker, DatePicker, DropDownC, TextArea, UploadButton} from "../../../../others/components";
import {capitalizeFirstLetter, getArrayByC, numberTimeToStr, timeToString} from "../../../../../global/tools";
import {DATE_FORMAT, repetitionDelays} from "../../../../../global/constants";
import React from "react";
import {taskType} from "../../../../../global/types";

export type createModalUIType = {
    formik: any,
    close : Function,
    error : string | null
}

const CreateModalComponent = ({formik,close,error}: createModalUIType) => {
    const {handleChange,handleSubmit,setFieldValue} = formik
    const values : taskType = formik.values
    const fullhours =  [...getArrayByC(24).map(numberTimeToStr),'0:00']

    return <Draggable handle={'.draggableModalHandler'} bounds={'.dragableMain'}
    defaultPosition={{x: 500, y: 100}}>
    <ModalElement isBackground={!!values.taskBackground}>
    <ModalDraggable className={'draggableModalHandler'}>
    <FaGripLines style={{color: '#CECECE'}}/>
    {/*@ts-ignore*/}
    <AiOutlineClose style={{cursor: "pointer"}} onClick={close}/>
    </ModalDraggable>
    <ModalWrapper w={80}>
    <TextField error={!!false}
    id="standard-basic" label="Add Title" variant="standard"
    size={'small'} sx={{width: '80%', marginTop: '15px', marginBottom: '5px'}}
    placeholder={'Add Title'} autoComplete={'off'} value={values.title}
    onChange={handleChange('title')}/>

    <ButtonsContainer>
    <Button variant={values.isTask ? "contained" : "text"} size={'small'}
    sx={{marginRight: '10px'}} onClick={() => setFieldValue('isTask',true)}>Task</Button>
    <Button variant={!values.isTask ? "contained" : "text"} size={'small'}
    onClick={() => setFieldValue('isTask',false)}>Reminder</Button>
    </ButtonsContainer>

    <TimeWrapper>
    <DatePicker date={dayjs(values.date)} handleDate={(date: Dayjs) => setFieldValue('date',date.format(DATE_FORMAT))}/>

    <ButtonsContainer w={120}>
    <DropDownC handler={handleChange('starts')} value={values.starts} names={fullhours} formVariant={'standard'}/>
    <DropDownC handler={handleChange('ends')} value={values.ends}
               names={fullhours}  formVariant={'standard'}/>
    </ButtonsContainer>

    <ButtonsContainer w={120}>
    <DropDownC handler={handleChange('repetitionDelay')}
    minWidth={200} value={values.repetitionDelay}
    names={repetitionDelays}
    formVariant={'standard'}/>
    </ButtonsContainer>

    <TextArea desc={values.description || ''} setDesc={handleChange('description')}/>

    <UploadButton handler={(file: any) => setFieldValue('taskBackground',file)}/>

    {values.taskBackground && <TaskImage src={URL.createObjectURL(values.taskBackground as any)}/>}

    <ColorPicker handler={(hex: string) => setFieldValue('color',hex)}/>

    <ComponentError>{error}</ComponentError>
    <SendButtonsWrapper>
    <ButtonsContainer w={80} jc={'flex-end'}>
        {/*@ts-ignore*/}
        <Button onClick={close}
        variant="outlined" size={'small'}
        sx={{width: '120px', marginRight: '10px'}} color={'info'}>Cancel</Button>
        {/*@ts-ignore*/}
        <Button onClick={handleSubmit}
        variant="contained" size={'small'}
        sx={{marginRight: '10px', width: '120px'}}>Save</Button>
    </ButtonsContainer>
    </SendButtonsWrapper>

    </TimeWrapper>
    </ModalWrapper>
    </ModalElement>
    </Draggable>
    }

export default CreateModalComponent
