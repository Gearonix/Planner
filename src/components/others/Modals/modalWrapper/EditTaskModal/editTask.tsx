import React from 'react';
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
    DatePicker,
    DropDownC,
    Input,
    Progress,
    TextArea,
    UploadButton
} from '../../../components';
import {Dayjs} from "dayjs";
import {getArrayByC, numberTimeToStr, strToTimeNumber} from "../../../../../helpers/tools";
import {repetitionDelays, taskColors} from "../../../../../global/constants";
import {BsCalendarEvent} from "react-icons/bs";
import {createModalUIType} from '../createTaskModal/createTaskModal';
import {useDispatch, useSelector} from "react-redux";
import {StateType} from "../../../../../global/store";
import Alert from '@mui/material/Alert/Alert';
import {deleteTask} from "../../../../../reducers/tasksListReducer";
import {taskType} from "../../../../../global/types";

const EditTask = ({formik, close, error}: createModalUIType) => {
    const {handleChange, handleSubmit, setFieldValue, errors} = formik
    const values: taskType = formik.values
    const username = useSelector((state: StateType) => state.userData.userName)
    const fullHours = [...getArrayByC(24).map(numberTimeToStr)]
    const dispatch = useDispatch()
    return <EditTaskPage>
        <SaveBlock>
            {/*@ts-ignore*/}
            <CrossContainer onClick={close}>
                <AiOutlineClose/>
            </CrossContainer>
            <TitleContainer>
                <Input id={"standard-password-input"} label={'Add Title'} variant={'standard'}
                       fw css={{fontSize: 28}} onChange={handleChange('title')} value={values.title}
                       error={errors.title}/>
                <DateSelectBlock>
                    <div style={{marginTop: '7px', marginRight: '10px'}}>
                        <DatePicker handleDate={(date: Dayjs) => {
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
                {/*@ts-ignore*/}
                <Progress color={taskColors[values.color].muiColor}/>
                <UploadButton handler={(file: any) => setFieldValue('taskBackground', file)} size={'medium'}
                              title={'Upload Image'}/>
                <MarginBottom/>
                <ColorPicker handler={(hex: string) => setFieldValue('color', hex)}/>
                <UserNameWrapper>
                    <BsCalendarEvent/>
                    <h5>{username}</h5>
                </UserNameWrapper>
                {error && <Alert severity="error">{error}</Alert>}
                <TextArea desc={values.description || ''}
                          setDesc={handleChange('description')}
                          css={{width: '680px', height: '140px'}}/>

            </TitleContainer>
            <SaveButtonsContainer>
                <SaveButton variant="contained" onClick={handleSubmit}>
                    Save
                </SaveButton>
                <SaveButton color={'error'} variant={'outlined'} onClick={() => {
                    // @ts-ignore
                    dispatch(deleteTask(values.task_id))
                    close()
                }}>Delete</SaveButton>

            </SaveButtonsContainer>
        </SaveBlock>

    </EditTaskPage>
}
export default EditTask;
