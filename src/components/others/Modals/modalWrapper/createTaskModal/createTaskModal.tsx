import {Dayjs} from "dayjs";
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
import {TextArea, UploadButton} from "../../../materialUI/buttonsAndInputs";
import {
    convertToDate,
    convertToDayJs,
    generateArray,
    numberTimeToStr,
    strToTimeNumber
} from "../../../../../utils/tools";
import {repetitionDelays} from "../../../../../setup/constants";
import React, {useEffect} from "react";
import {taskType} from "../../../../../types/stateTypes";
import {animated, useSpring} from "@react-spring/web";
import Animations from "../../../../../helpers/animations";
import {createModalUIType} from "../../../../Main/others/mainTypes";
import {DropDownC, InputDatePicker} from "../../../materialUI/datepicker";
import {ColorPicker} from "../../../materialUI/colorPicker";
import {useTranslation} from "react-i18next";


const CreateModalComponent = ({formik, startClosing, error, style}: createModalUIType) => {
    const {handleChange, handleSubmit, setFieldValue, errors} = formik
    const values: taskType = formik.values
    const fullHours = generateArray(24).map(numberTimeToStr)
    const {t} = useTranslation()

    const [animations, api] = useSpring(Animations.modalError(style).start, [])
    const animateError = () => api.start(Animations.modalError(style).api)
    useEffect(() => {
        if (error) animateError()
    })

    return <Draggable handle={'.draggableModalHandler'} bounds={'.draggableElement'}
                      defaultPosition={{x: 500, y: 100}}>
        <DraggableModal>
            <Animated style={{
                ...style, transform: animations.translate.to(Animations.modalError(style).transformHandler),
                background: animations.backgroundColor
            }} isbackground={values.taskBackground} as={animated.div}>
                <ModalDraggable className={'draggableModalHandler'}>
                    <FaGripLines style={{color: '#CECECE'}}/>
                    <AiOutlineClose style={{cursor: "pointer"}} onClick={startClosing}/>
                </ModalDraggable>
                <ModalWrapper w={80}>
                    <TextField error={!!errors.title}
                               id="standard-basic" label={t('addTitle') || ''} variant="standard"
                               size={'small'} sx={{width: '80%', marginTop: '15px', marginBottom: '5px'}}
                               autoComplete={'off'} value={values.title}
                               onChange={handleChange('title')}/>

                    <ButtonsContainer>
                        <Button variant={values.isTask ? "contained" : "text"} size={'small'}
                                sx={{marginRight: '10px'}}
                                onClick={() => setFieldValue('isTask', true)}>{t('task')}</Button>
                        <Button variant={!values.isTask ? "contained" : "text"} size={'small'}
                                onClick={() => setFieldValue('isTask', false)}>{t('reminder')}</Button>
                    </ButtonsContainer>

                    <TimeWrapper>
                        <InputDatePicker date={convertToDayJs(values.selectedDate)}
                                         handleDate={(date: Dayjs) =>
                                             setFieldValue('selectedDate', convertToDate(date))}
                                         label={t('chooseDate') || ''}/>

                        <ButtonsContainer w={120}>
                            <DropDownC handler={(value: string) => {
                                setFieldValue('starts', value)
                                let ends = numberTimeToStr(strToTimeNumber(value) + 1)
                                if (ends === '24:00') ends = '00:00'
                                setFieldValue('ends', ends)
                            }
                            } value={values.starts} names={fullHours} formVariant={'standard'}/>
                            <DropDownC handler={handleChange('ends')} value={values.ends}
                                       names={values.starts === '23:00' ? ['00:00'] : fullHours.slice(fullHours.indexOf(values.ends))}
                                       formVariant={'standard'}/>
                        </ButtonsContainer>

                        <ButtonsContainer w={120}>
                            <DropDownC handler={handleChange('repetitionDelay')}
                                       minWidth={200} value={values.repetitionDelay}
                                       names={repetitionDelays}
                                       formVariant={'standard'}/>
                        </ButtonsContainer>

                        <TextArea desc={values.description || ''} setDesc={handleChange('description')}
                                  ph={t('description') || ''}/>

                        <UploadButton handler={(file: any) =>
                            setFieldValue('taskBackground', file)} title={t('upload') || ''}/>

                        {values.taskBackground && <TaskImage src={URL.createObjectURL(values.taskBackground as any)}/>}

                        <ColorPicker handler={(hex: string) => setFieldValue('color', hex)}/>
                        <ComponentError>{error}</ComponentError>
                        <SendButtonsWrapper>
                            <ButtonsContainer w={80} jc={'flex-end'}>
                                <Button onClick={startClosing}
                                        variant="outlined" size={'small'}
                                        sx={{width: '120px', marginRight: '10px'}} color={'info'}>{t('cancel')}</Button>
                                <Button onClick={() => {
                                    if (errors.title || !values.title) return animateError()
                                    handleSubmit()
                                }
                                }
                                        variant="contained" size={'small'}
                                        sx={{marginRight: '10px', width: '120px'}}>{t('save')}</Button>
                            </ButtonsContainer>
                        </SendButtonsWrapper>
                    </TimeWrapper>
                </ModalWrapper>
            </Animated>

        </DraggableModal>
    </Draggable>
}

export default CreateModalComponent
