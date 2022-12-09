import React from 'react';
import { ChangeModalElement, CircleButton, CircleButtonBlock,
    Color, ColorBlock, Description, ImageBlock, InfoBlock, InfoIcon, MainBlock, ModalImage, Title } from './infoModal.styles';
import {AiOutlineClose} from 'react-icons/ai'
import {BsPen,BsTrash,BsCalendarEvent
} from 'react-icons/bs';
import {FaGripLines} from 'react-icons/fa'
import {TfiBell} from 'react-icons/tfi'
import Draggable from "react-draggable";
import {taskType} from "../../../../global/types";
import {FILES_LOCATION, taskColors} from '../../../../global/constants';
import {StateType} from "../../../../global/store";
import {useDispatch, useSelector} from "react-redux";
import {capitalizeFirstLetter, stringToTime, toMonthName} from "../../../../global/tools";
import {UserImageElement} from "../../../Profile/profile.styles";
import {deleteTask} from "../../../../reducers/tasksListReducer";
const InfoModal = ({task,close} : {task : taskType,close : Function}) => {
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
            <ImageBlock >
                <CircleButtonBlock>
                    <CircleButton>
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
                        {task.isTask ? 'Task' : 'Reminder'}
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
