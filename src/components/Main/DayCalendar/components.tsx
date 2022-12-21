import {taskType} from "../../../global/types/stateTypes";
import {getArrayByC, strToTimeNumber} from "../../../helpers/tools";
import React, {useContext} from "react";
import {MainContext} from "../reducer";
import {animated, useSpring, useTransition} from "@react-spring/web";
import Animations from "../../../helpers/animations";
import {
    DayCalendarMain,
    DayList,
    DayTask,
    DayTaskImage,
    DayTaskTimeRange,
    DayTaskTitle,
    HourBlock,
    HoursContainer,
    HourTime
} from "./dayCalendar.styles";
import {FILES_LOCATION, taskColors} from "../../../global/constants";

export const Task = ({task, openInfo}: { task: taskType, openInfo: Function }) => {
    const [startTime, endTime] = [strToTimeNumber(task.starts), strToTimeNumber(task.ends) || 24]

    const context = useContext(MainContext)
    const mainState = context.state

    const [animations, api] = useSpring(() => Animations.deleteTask().start)
    if (mainState.DeletingTaskId == task.task_id && mainState.DeletingTaskId != null) {
        api.start(Animations.deleteTask().api())
    }


    return <DayTask length={endTime - startTime} top={startTime}
                    onClick={() => {
                        if (!mainState.modalComponent) openInfo()
                    }}
                    theme={taskColors[task.color]}
                    style={{...animations, width: animations.width.to(i => i + '%')}} as={animated.div}>
        <DayTaskTitle>{task.title}</DayTaskTitle>
        <DayTaskTimeRange>{task.starts}-{task.ends}</DayTaskTimeRange>
        {task.taskBackground &&
        <DayTaskImage src={FILES_LOCATION + '/task_backgrounds/' + task.taskBackground}/>}
    </DayTask>
}

export const NoneDayCalendar = () => <DayCalendarMain className={'dragableMain'}>
    <DayList>
        <HoursContainer>
            {getArrayByC(24).map((i, idx) => {
                return <HourBlock key={idx}>
                    <HourTime>{i}:00</HourTime>
                </HourBlock>
            })}
        </HoursContainer>
    </DayList>
</DayCalendarMain>

export const NoneTask = () => {
    const {state} = useContext(MainContext)
    const transitions = useTransition(state.isModalAnimated, Animations.widthOpacity())


    return transitions((style, item) => {
        return item ? <DayTask length={1} top={state.componentIndex || 0}
                               as={animated.div} style={{
            ...style,
            width: style.width.to(i => i + '%')
        }} theme={taskColors.blue}>
            <DayTaskTitle>(No Title)</DayTaskTitle></DayTask> : null
    })
}
