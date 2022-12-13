import React from 'react';
import {
    ChangeModalElement,
    CircleButton,
    CircleButtonBlock,
    Color,
    ColorBlock,
    Description,
    ImageBlock,
    InfoBlock,
    InfoIcon,
    MainBlock,
    Title
} from './infoModal.styles';
import {AiOutlineClose} from 'react-icons/ai'
import {BsCalendarEvent, BsPen, BsTrash} from 'react-icons/bs';
import {TfiBell} from 'react-icons/tfi'
import Draggable from "react-draggable";
import {taskType} from "../../../../global/types";
import {taskColors} from '../../../../global/constants';
import {StateType} from "../../../../global/store";
import {useDispatch, useSelector} from "react-redux";
import {capitalizeFirstLetter, cutString, stringToTime, toMonthName} from "../../../../helpers/tools";
import {deleteTask} from "../../../../reducers/tasksListReducer";

const InfoModal = ({task,close,editTask} : {task : taskType,close : Function,editTask : Function}) => {
    const weekDay = useSelector((state : StateType) => state.taskLists.current.weekDay)
    const userName = useSelector((state : StateType) => state.userData.userName)
    const [year,month,date] = stringToTime(task.date)
    const dispatch = useDispatch()
    const delTask = () => {
        // @ts-ignore
        dispatch(deleteTask(task.task_id))
        close()
    }
    return (
        <Draggable  bounds={'.dragableMain'}
                   defaultPosition={{x : 500, y : 100 }}>
        <ChangeModalElement>
            <ImageBlock>
                <CircleButtonBlock>
                    {/*@ts-ignore*/}
                    <CircleButton onClick={editTask}>
                        <BsPen/>
                    </CircleButton>
                    {/*@ts-ignore*/}
                    <CircleButton onClick={delTask}>
                        <BsTrash/>
                    </CircleButton>
                    {/*@ts-ignore*/}
                    <CircleButton onClick={close}>
                        <AiOutlineClose/>
                    </CircleButton>
                </CircleButtonBlock>
            </ImageBlock>
            <MainBlock>
                <ColorBlock>
                    {/*@ts-ignore*/}
                    <Color color={taskColors[task.color]}/>
                    <InfoIcon>
                        <TfiBell/>
                    </InfoIcon>
                    <InfoIcon style={{marginTop: '0px'}}>
                        <BsCalendarEvent/>
                    </InfoIcon>
                </ColorBlock>
                <InfoBlock>
                    <Title>{task.title}</Title>
                    <Description>
                        {weekDay}, {date} {toMonthName(month)} &bull; {task.starts}-{task.ends}
                    </Description>
                    <Description>
                        {capitalizeFirstLetter(task.repetitionDelay)}
                    </Description>
                    <Description style={{marginTop: '35px'}}>
                        {cutString(task.description || '', 20) || 'No description'}
                    </Description>
                    <Description style={{marginTop: '8px'}}>
                        {userName}
                    </Description>
                </InfoBlock>
            </MainBlock>
        </ChangeModalElement>
        </Draggable>
    );
};

export default InfoModal;