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
import {
    CheckBox,
    ColorPicker,
    DropDownC,
    Input,
    InputDatePicker,
    Progress,
    TextArea,
    UploadButton
} from '../../../components';
import {Dayjs} from "dayjs";
import {getArrayByC, numberTimeToStr, strToTimeNumber} from "../../../../../helpers/tools";
import {repetitionDelays, taskColors} from "../../../../../global/constants";
import {BsCalendarEvent} from "react-icons/bs";
import {useSelector} from "react-redux";
import Alert from '@mui/material/Alert/Alert';
import {taskType} from "../../../../../global/types/stateTypes";
import {StateType} from "../../../../../global/types/types";
import {createModalUIType} from "../../../../../global/types/components/mainTypes";
import {actions, MainContext} from "../../../../Main/reducer";

const EditTask = ({formik, close, error, style}: createModalUIType) => {
    const {handleChange, handleSubmit, setFieldValue, errors} = formik
    const values: taskType = formik.values
    const username = useSelector((state: StateType) => state.userData.userName)
    const fullHours = [...getArrayByC(24).map(numberTimeToStr)]
    const context = useContext(MainContext)


    return <EditTaskPage style={style}>
        <SaveBlock>
            <CrossContainer onClick={close}>
                <AiOutlineClose/>
            </CrossContainer>
            <TitleContainer>
                <Input id={"standard-password-input"} variant={'standard'}
                       fw css={{fontSize: 26,}} onChange={handleChange('title')} value={values.title}
                       error={errors.title}
                       placeholder={'Add Title'}/>
                <DateSelectBlock>
                    <div style={{marginTop: '7px', marginRight: '10px'}}>
                        <InputDatePicker handleDate={(date: Dayjs) => {
                            // @ts-ignore
                            setFieldValue('date', date)
                        }} date={values.date} disabled={true}/>
                    </div>

                    <DropDownC handler={(value: string) => {
                        setFieldValue('starts', value)
                        let ends = numberTimeToStr(strToTimeNumber(value) + 1)
                        if (ends == '24:00') ends = '00:00'
                        setFieldValue('ends', ends)
                    }} value={values.starts} names={fullHours} title={'Starts'}/>
                    <SymbolText>
                        —
                    </SymbolText>
                    <DropDownC handler={handleChange('ends')}
                               value={values.ends}
                               names={values.starts == '23:00' ? ['00:00'] : fullHours.slice(fullHours.indexOf(values.ends))}
                               title={'Ends'}/>
                </DateSelectBlock>
                <CheckBox title={'Event'} checked={values.isTask || false}
                          handler={(checked: boolean) => {
                              setFieldValue('isTask', checked)
                          }}/>
                <DropDownC handler={handleChange('repetitionDelay')} value={values.repetitionDelay}
                           names={repetitionDelays}
                           title={'Repeat'}/>
                <MarginBottom/>
                <Progress theme={taskColors[values.color].muiColor}/>
                <UploadButton
                    handler={(file: React.FormEvent<HTMLInputElement>) => setFieldValue('taskBackground', file)}
                    size={'medium'}
                    title={'Upload Image'}/>
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
                              paddingTop: '10px', paddingLeft: '10px'
                          }}/>

            </TitleContainer>
            <SaveButtonsContainer>
                <SaveButton variant="contained" onClick={() => {
                    close()
                    setTimeout(() => {
                        handleSubmit()
                    }, 400)
                }
                }>
                    Save
                </SaveButton>
                <SaveButton color={'error'} variant={'outlined'} onClick={() => {
                    context.dispatch(actions.setDeletingTask(values.task_id))
                    close()
                }}>Delete</SaveButton>

            </SaveButtonsContainer>
        </SaveBlock>

    </EditTaskPage>
}
export default EditTask;
