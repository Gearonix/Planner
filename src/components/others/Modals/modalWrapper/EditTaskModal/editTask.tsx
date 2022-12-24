import React, {useContext} from 'react';
import {
    CrossContainer,
    DateSelectBlock,
    EditTaskPage,
    MarginBottom,
    SaveBlock,
    SaveButton,
    SaveButtonsContainer,
    SymbolText,
    TitleContainer,
    UserNameWrapper
} from './editTask.styles';
import {AiOutlineClose} from 'react-icons/ai'
import {CheckBox, Input, Progress, TextArea, UploadButton} from '../../../materialUI/buttonsAndInputs';
import {Dayjs} from "dayjs";
import {generateArray, numberTimeToStr, strToTimeNumber} from "../../../../../utils/tools";
import {repetitionDelays, taskColors} from "../../../../../setup/constants";
import {BsCalendarEvent} from "react-icons/bs";
import {useSelector} from "react-redux";
import Alert from '@mui/material/Alert/Alert';
import {taskType} from "../../../../../types/stateTypes";
import {StateType} from "../../../../../types/appTypes";
import {createModalUIType} from "../../../../Main/others/mainTypes";
import {actions, MainContext} from "../../../../Main/utils/reducer";
import {DropDownC, InputDatePicker} from "../../../materialUI/datepicker";
import {ColorPicker} from "../../../materialUI/colorPicker";
import {useTranslation} from "react-i18next";

const EditTask = ({formik, startClosing, error, style}: createModalUIType) => {
    const {handleChange, handleSubmit, setFieldValue, errors} = formik
    const values: taskType = formik.values
    const username = useSelector((state: StateType) => state.userData.userName)
    const fullHours = [...generateArray(24).map(numberTimeToStr)]
    const context = useContext(MainContext)
    const {t} = useTranslation()


    return <EditTaskPage style={style}>
        <SaveBlock>
            <CrossContainer onClick={startClosing}>
                <AiOutlineClose/>
            </CrossContainer>
            <TitleContainer>
                <Input id={"standard-password-input"} variant={'standard'}
                       fw css={{fontSize: 26,}} onChange={handleChange('title')} value={values.title}
                       error={errors.title}
                       placeholder={t('addTitle') || ''}/>
                <DateSelectBlock>
                    <div style={{marginTop: '7px', marginRight: '10px'}}>
                        <InputDatePicker handleDate={(date: Dayjs) => {
                            // @ts-ignore
                            setFieldValue('date', date)}} date={values.date} disabled={true}/>
                    </div>

                    <DropDownC handler={(value: string) => {
                        setFieldValue('starts', value)
                        let ends = numberTimeToStr(strToTimeNumber(value) + 1)
                        if (ends === '24:00') ends = '00:00'
                        setFieldValue('ends', ends)
                    }} value={values.starts} names={fullHours} title={t('starts') || ''}/>
                    <SymbolText>
                        —
                    </SymbolText>
                    <DropDownC handler={handleChange('ends')}
                               value={values.ends}
                               names={values.starts === '23:00' ? ['00:00'] : fullHours.slice(fullHours.indexOf(values.ends))}
                               title={t('ends') || ''}/>
                </DateSelectBlock>
                <CheckBox title={t('event') || ''} checked={values.isTask || false}
                          handler={(checked: boolean) => {
                              setFieldValue('isTask', checked)
                          }}/>
                <DropDownC handler={handleChange('repetitionDelay')} value={values.repetitionDelay}
                           names={repetitionDelays}
                           title={t('repeat') || ''}/>
                <MarginBottom/>
                <Progress theme={taskColors[values.color].muiColor}/>
                <UploadButton
                    handler={(file: React.FormEvent<HTMLInputElement>) => setFieldValue('taskBackground', file)}
                    size={'medium'}
                    title={t('uploadImage') || ''}/>
                <MarginBottom/>

                <ColorPicker handler={(hex: string) => setFieldValue('color', hex)}
                             isDark={true}/>
                <UserNameWrapper>
                    <BsCalendarEvent/>
                    <h5>{username}</h5>
                </UserNameWrapper>
                {error && <Alert severity="error">{error}</Alert>}
                <TextArea desc={values.description || ''}
                          setDesc={handleChange('description')}
                          css={{
                              width: '690px', height: '140px',
                              background: '#444444', color: 'black',
                              paddingTop: '10px', paddingLeft: '10px',
                              marginLeft: '-10px'
                          }} ph={t('description') || ''}
                />

            </TitleContainer>
            <SaveButtonsContainer>
                <SaveButton variant="contained" onClick={() => {
                    startClosing()
                    setTimeout(() => {
                        handleSubmit()
                    }, 400)
                }
                }>
                    {t('save')}
                </SaveButton>
                <SaveButton color={'error'} variant={'outlined'} onClick={() => {
                    context.dispatch(actions.setDeletingTask(values.task_id))
                    startClosing()
                }}>{t('delete')}</SaveButton>

            </SaveButtonsContainer>
        </SaveBlock>

    </EditTaskPage>
}
export default EditTask;
