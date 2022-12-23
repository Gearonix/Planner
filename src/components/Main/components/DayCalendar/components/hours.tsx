import {FC, useContext} from "react";
import {actions, MainContext} from "../../../utils/reducer";
import {
    DayTask,
    DayTaskImage,
    DayTaskTimeRange,
    DayTaskTitle,
    HourBlock,
    HoursContainer,
    HourTime
} from "../dayCalendar.styles";
import {generateArray, strToTimeNumber} from "../../../../../utils/tools";
import {taskType} from "../../../../../types/stateTypes";
import {NoneTask} from "./emptyLayouts";
import {hoursProps, taskProps} from "../../../others/mainTypes";
import {animated, useSpring} from "@react-spring/web";
import Animations from "../../../../../helpers/animations";
import {FILES_LOCATION, taskColors} from "../../../../../setup/constants";


export const HoursWrapper: FC<hoursProps> = (props) => {

    const [animations, animationApi] = useSpring(Animations.opacityMoves.start, [])
    const context = useContext(MainContext)
    const AnimatedHours = animated(Hours)

    if (context.state.isComponentAnimating) {
        animationApi.start(Animations.opacityMoves.animate(() => {
            context.dispatch(actions.animateComponent(false))
        }))
    }


    return <AnimatedHours {...props} style={animations}/>
}

export const Hours: FC<hoursProps> = ({openModal, tasklist, deleteTask, state, style}) => {

    return <HoursContainer style={style} as={animated.div}>
        {generateArray(24).map((i, idx) => {
            return <HourBlock key={idx} onClick={() => {
                if (!state.modalComponent) openModal(i, 'createModal')
            }}>
                <HourTime>{i}:00</HourTime>
            </HourBlock>
        })}
        {tasklist.map((task: taskType, idx: number) =>
            <Task task={task} openInfo={() => openModal(idx, 'infoModal')} key={idx} state={state}
                  deleteTask={deleteTask}/>)}
        {state.modalComponent === 'createModal' && <NoneTask/>}
    </HoursContainer>
}


export const Task: FC<taskProps> = ({task, openInfo, deleteTask, state}) => {
    const [startTime, endTime] = [strToTimeNumber(task.starts), strToTimeNumber(task.ends) || 24]

    const [animations, api] = useSpring(() => Animations.deleteTask.start, [])
    const styles = {...animations, width: animations.width.to(i => i + '%')}

    if (state.deletingTaskId === task.task_id && state.deletingTaskId !== null) {
        api.start(Animations.deleteTask.api(deleteTask(task.task_id || '')))
    }
    const openInfoModal = () => {
        if (!state.modalComponent) {
            openInfo()
        }
    }


    return <DayTask length={endTime - startTime} top={startTime}
                    onClick={openInfoModal}
                    theme={taskColors[task.color]}
                    style={styles} as={animated.div} isTask={task.isTask}>
        <DayTaskTitle>{task.title} {!task.isTask && ' | Reminder'}</DayTaskTitle>
        <DayTaskTimeRange>{task.starts}-{task.ends}</DayTaskTimeRange>
        {task.taskBackground &&
        <DayTaskImage src={FILES_LOCATION + '/task_backgrounds/' + task.taskBackground}/>}
    </DayTask>
}
