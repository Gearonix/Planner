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
import {taskColors} from '../../../../setup/constants';
import {useSelector} from "react-redux";
import {capitalizeFirstLetter, cutString, getCurrentList} from "../../../../utils/tools";
import {animated, useTransition} from "@react-spring/web";
import Animations from "../../../../helpers/animations";
import {actions, MainContext} from "../../../Main/utils/reducer";
import Selectors from "../../../../helpers/selectors";
import {infoModalT} from "../../../Main/others/mainTypes";
import {FaGripLines} from 'react-icons/fa';


const InfoModalWrapper = () => {
    const Animated = animated(InfoModal)
    const context = useContext(MainContext)
    const taskLists = useSelector(Selectors.taskLists)
    const userName = useSelector(Selectors.userName)
    const mainState = context.state
    const task = getCurrentList(taskLists, mainState.filter)[mainState.modalIndex || 0]

    const openEditPage = () => context.dispatch(actions.openModal('editPage'))
    const close = () => context.dispatch(actions.animate(false))

    const startDeleting = () => {
        close()
        context.dispatch(actions.setDeletingTask(task.task_id))
    }
    const transitions = useTransition(mainState.isModalAnimating, Animations.infoModal(context.closeModal))

    return transitions((style, item) => item ? <Animated style={style} task={task}
                                                         openEditPage={openEditPage} close={close}
                                                         deleteTask={startDeleting} userName={userName}/> : null)
}


const InfoModal = ({style, task, openEditPage, close, deleteTask, userName}: infoModalT) => {
    if (!task) return null
    const {month, date} = task.selectedDate

    return (
        <Draggable bounds={'.draggableElement'}
                   defaultPosition={{x: 500, y: 100}} handle={'.draggableModalHandler'}>
            <InfoDraggable>
                <ChangeModalElement style={style}>
                    <ImageBlock>
                        <CircleButtonBlock>
                            <CircleButton>
                                <FaGripLines className={'draggableModalHandler'}/>
                            </CircleButton>
                            <CircleButton onClick={openEditPage}>
                                <BsPen/>
                            </CircleButton>
                            <CircleButton onClick={deleteTask}>
                                <BsTrash/>
                            </CircleButton>
                            <CircleButton onClick={close}>
                                <AiOutlineClose/>
                            </CircleButton>
                        </CircleButtonBlock>
                    </ImageBlock>
                    <MainBlock>
                        <ColorBlock>
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
                                {'WEEK_DAY'}, {date} {month} &bull; {task.starts}-{task.ends}
                            </Description>
                            <Description>
                                {capitalizeFirstLetter(task.repetitionDelay)} | {task.isTask ? 'Task' : 'Reminder'}
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
