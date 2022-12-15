import React, {useContext, useState} from 'react';
import {
    ChangeModalElement,
    CircleButton,
    CircleButtonBlock,
    Color,
    ColorBlock,
    Description,
    ImageBlock,
    InfoBlock,
    InfoDraggable,
    InfoIcon,
    MainBlock,
    Title
} from './infoModal.styles';
import {AiOutlineClose} from 'react-icons/ai'
import {BsCalendarEvent, BsPen, BsTrash} from 'react-icons/bs';
import {TfiBell} from 'react-icons/tfi'
import Draggable from "react-draggable";
import {taskColors} from '../../../../global/constants';
import {useDispatch, useSelector} from "react-redux";
import {capitalizeFirstLetter, cutString, stringToTime, toMonthName} from "../../../../helpers/tools";
import {deleteTask} from "../../../../reducers/tasksListReducer";
import {animated, useTransition} from "@react-spring/web";
import Animations from "../../../../helpers/animations";
import {actions, MainContext} from "../../../Main/reducer";
import {StateType} from "../../../../global/types/types";


const InfoModalWrapper = () => {
    const [isOpen, setIsOpen] = useState(true)
    const Animated = animated(InfoModal)
    const context = useContext(MainContext)
    const close = () => context.dispatch(actions.closeComponent())

    const transitions = useTransition(isOpen, Animations.infoModal(close))
    return transitions((style, item) => item ? <Animated close={() => setIsOpen(false)} style={style}/> : null)
}


const InfoModal = ({close, style}: { close: Function, style: any }) => {
    const context = useContext(MainContext)
    const mainState = context.state
    const weekDay = useSelector((state: StateType) => state.taskLists.current.weekDay)
    const userName = useSelector((state: StateType) => state.userData.userName)
    const tasklist = useSelector((state: StateType) => state.taskLists.current.tasklist)
    const task = tasklist[mainState.componentIndex || 0]
    const dispatch = useDispatch()
    if (!task) return null

    const [year, month, date] = stringToTime(task.date)

    const delTask = () => {
        close()
        setTimeout(() => {
            // @ts-ignore
            dispatch(deleteTask(task.task_id))
        }, 300)

    }

    return (
        <Draggable bounds={'.dragableMain'}
                   defaultPosition={{x: 500, y: 100}}>
            <InfoDraggable>
                <ChangeModalElement style={style}>
                    <ImageBlock>
                        <CircleButtonBlock>
                            <CircleButton onClick={() => context.dispatch(actions.openComponent('editPage'))}>
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
            </InfoDraggable>
        </Draggable>
    );
};

export default InfoModalWrapper;
