import React, {useContext} from 'react';
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
import {DispatchType} from "../../../../global/store";
import {taskType} from "../../../../global/types/stateTypes";
import Selectors from "../../../../helpers/selectors";


const InfoModalWrapper = () => {
    const Animated = animated(InfoModal)
    const context = useContext(MainContext)
    const mainState = context.state
    const tasklist = useSelector(Selectors.currentTaskList)
    const task = tasklist[mainState.componentIndex || 0]
    const dispatch = useDispatch<DispatchType>()
    const closeComponent = () => {
        context.dispatch(actions.closeComponent())
        if (mainState.DeletingTaskId == task.task_id && mainState.DeletingTaskId != null) {
            dispatch(deleteTask(task.task_id || ''))
            context.dispatch(actions.setDeletingTask(null))
        }
    }
    const transitions = useTransition(mainState.isModalAnimated, Animations.infoModal(closeComponent))
    return transitions((style, item) => item ? <Animated style={style} task={task}/> : null)
}


const InfoModal = ({style, task}: { style: any, task: taskType }) => {
    const context = useContext(MainContext)
    const {weekDay} = useSelector(Selectors.current)
    const userName = useSelector(Selectors.userName)
    if (!task) return null

    const [year, month, date] = stringToTime(task.date)

    return (
        <Draggable bounds={'.dragableMain'}
                   defaultPosition={{x: 500, y: 100}}>
            <InfoDraggable>
                <ChangeModalElement style={style}>
                    <ImageBlock>
                        <CircleButtonBlock>
                            <CircleButton onClick={() => context.dispatch(actions.openModal('editPage'))}>
                                <BsPen/>
                            </CircleButton>
                            {/*@ts-ignore*/}
                            <CircleButton onClick={() => {
                                context.dispatch(actions.animateModal(false))
                                context.dispatch(actions.setDeletingTask(task.task_id))
                            }
                            }>
                                <BsTrash/>
                            </CircleButton>
                            {/*@ts-ignore*/}
                            <CircleButton onClick={() => context.dispatch(actions.animateModal(false))}>
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
