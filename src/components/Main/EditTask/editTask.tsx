import React from 'react';
import {
    CrossContainer,
    DateSelectBlock, EditTaskPage,
    MarginBottom, SaveBlock, SaveButton, SaveButtonsContainer, SymbolText, TitleContainer, UserNameWrapper
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
} from '../../others/components';
import {Dayjs} from "dayjs";
import {capitalizeFirstLetter, getArrayByC, numberTimeToStr, strToTimeNumber} from "../../../global/tools";
import {repetitionDelays, taskColors} from "../../../global/constants";
import {BsCalendarEvent} from "react-icons/bs";
import {createModalUIType} from '../Modals/CreateTaskModal/createModalUI/createModalUI';
import {useSelector} from "react-redux";
import {StateType} from "../../../global/store";

const EditTask = ({formik, close,error}: createModalUIType) => {
    const {values, handleChange, handleSubmit, setFieldValue} = formik
    const username = useSelector((state: StateType) => state.userData.userName)
    const fullHours =  [...getArrayByC(24).map(numberTimeToStr),'0:00']

    return <EditTaskPage>
        <SaveBlock>
            {/*@ts-ignore*/}
            <CrossContainer onClick={close}>
                <AiOutlineClose/>
            </CrossContainer>
            <TitleContainer>
                <Input id={"standard-password-input"} label={'Add Title'} variant={'standard'}
                       fw css={{fontSize: 28}} onChange={handleChange('title')} value={values.title}/>
                <DateSelectBlock>
                    <div style={{marginTop: '7px', marginRight: '10px'}}>
                        <DatePicker handleDate={(date: Dayjs) => {
                            setFieldValue('date', date)
                        }} date={values.date}/>
                    </div>

                    <DropDownC handler={handleChange('starts')} value={values.starts} names={fullHours} title={'Starts'}/>
                    <SymbolText>
                        —
                    </SymbolText>
                    <DropDownC handler={handleChange('ends')}
                               value={values.ends} names={fullHours} title={'Ends'}/>
                </DateSelectBlock>
                <CheckBox title={'Reminder'} checked={values.isTask}
                          handler={(checked : boolean) => setFieldValue('isTask',checked)}/>
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
                <TextArea desc={values.description}
                          setDesc={handleChange('description')}
                          css={{width: '680px', height: '140px'}}/>

            </TitleContainer>
            <SaveButtonsContainer>
                <SaveButton variant="contained" onClick={handleSubmit}>
                    Save
                </SaveButton>
                <DropDownC handler={() => {
                }}
                           value={1} names={['10', '20', '30']} title={'Options'} formVariant={'filled'}
                           minWidth={160}/>
            </SaveButtonsContainer>
        </SaveBlock>

    </EditTaskPage>
}
export default EditTask;
