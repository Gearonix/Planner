import dayjs, {Dayjs} from "dayjs";
import Draggable from "react-draggable";
import {
    Animated,
    ButtonsContainer,
    ComponentError,
    DraggableModal,
    ModalDraggable,
    ModalWrapper,
    SendButtonsWrapper,
    TaskImage,
    TimeWrapper
} from "./CreateModal.styles";
import {FaGripLines} from "react-icons/fa";
import {AiOutlineClose} from "react-icons/ai";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button/Button";
import {ColorPicker, DatePicker, DropDownC, TextArea, UploadButton} from "../../../components";
import {getArrayByC, numberTimeToStr, strToTimeNumber} from "../../../../../helpers/tools";
import {DATE_FORMAT, repetitionDelays} from "../../../../../global/constants";
import React, {useEffect} from "react";
import {taskType} from "../../../../../global/types";
import {animated, useSpring} from "@react-spring/web";
import Animations from "../../../../../helpers/animations";


export type createModalUIType = {
    formik: any,
    close: Function,
    error: string | null,
    style?: any,
}

const CreateModalComponent = ({formik, close, error, style}: createModalUIType) => {
    const {handleChange, handleSubmit, setFieldValue, errors} = formik
    const values: taskType = formik.values
    const fullhours = [...getArrayByC(24).map(numberTimeToStr)]

    const [animations, api] = useSpring(Animations.modalError(style).start, [])
    const animateError = () => api.start(Animations.modalError(style).api)
    useEffect(() => {
        if (error) animateError()
    })


    return <Draggable handle={'.draggableModalHandler'} bounds={'.dragableMain'} defaultPosition={{x: 500, y: 100}}>
        <DraggableModal>
            <Animated style={{
                ...style, transform: animations.translate.to(Animations.modalError(style).transformHandler),
                background: animations.backgroundColor
            }} isBackground={!!values.taskBackground} as={animated.div}>
                <ModalDraggable className={'draggableModalHandler'}>
                    <FaGripLines style={{color: '#CECECE'}}/>
                    {/*@ts-ignore*/}
                    <AiOutlineClose style={{cursor: "pointer"}} onClick={close}/>
                </ModalDraggable>
                <ModalWrapper w={80}>
                    <TextField error={!!errors.title}
                               id="standard-basic" label="Add Title" variant="standard"
                               size={'small'} sx={{width: '80%', marginTop: '15px', marginBottom: '5px'}}
                               placeholder={'Add Title'} autoComplete={'off'} value={values.title}
                               onChange={handleChange('title')}/>

                    <ButtonsContainer>
                        <Button variant={values.isTask ? "contained" : "text"} size={'small'}
                                sx={{marginRight: '10px'}} onClick={() => setFieldValue('isTask', true)}>Task</Button>
                        <Button variant={!values.isTask ? "contained" : "text"} size={'small'}
                                onClick={() => setFieldValue('isTask', false)}>Reminder</Button>
                    </ButtonsContainer>

                    <TimeWrapper>
                        <DatePicker date={dayjs(values.date)}
                                    handleDate={(date: Dayjs) => setFieldValue('date', date.format(DATE_FORMAT))}/>

                        <ButtonsContainer w={120}>
                            <DropDownC handler={(value: string) => {
                                setFieldValue('starts', value)
                                let ends = numberTimeToStr(strToTimeNumber(value) + 1)
                                if (ends == '24:00') ends = '00:00'
                                setFieldValue('ends', ends)
                            }
                            } value={values.starts} names={fullhours} formVariant={'standard'}/>
                            <DropDownC handler={handleChange('ends')} value={values.ends}
                                       names={values.starts == '23:00' ? ['00:00'] : fullhours.slice(fullhours.indexOf(values.ends))}
                                       formVariant={'standard'}/>
                        </ButtonsContainer>

                        <ButtonsContainer w={120}>
                            <DropDownC handler={handleChange('repetitionDelay')}
                                       minWidth={200} value={values.repetitionDelay}
                                       names={repetitionDelays}
                                       formVariant={'standard'}/>
                        </ButtonsContainer>

                        <TextArea desc={values.description || ''} setDesc={handleChange('description')}/>

                        <UploadButton handler={(file: any) => setFieldValue('taskBackground', file)}/>

                        {values.taskBackground && <TaskImage src={URL.createObjectURL(values.taskBackground as any)}/>}

                        <ColorPicker handler={(hex: string) => setFieldValue('color', hex)}/>
                        <ComponentError>{error}</ComponentError>
                        <SendButtonsWrapper>
                            <ButtonsContainer w={80} jc={'flex-end'}>
                                {/*@ts-ignore*/}
                                <Button onClick={close}
                                        variant="outlined" size={'small'}
                                        sx={{width: '120px', marginRight: '10px'}} color={'info'}>Cancel</Button>
                                {/*@ts-ignore*/}
                                <Button onClick={() => {
                                    if (errors.title || !values.title) return animateError()
                                    handleSubmit()
                                }
                                }
                                        variant="contained" size={'small'}
                                        sx={{marginRight: '10px', width: '120px'}}>Save</Button>
                            </ButtonsContainer>
                        </SendButtonsWrapper>
                    </TimeWrapper>
                </ModalWrapper>
            </Animated>

        </DraggableModal>
    </Draggable>
}

export default CreateModalComponent
