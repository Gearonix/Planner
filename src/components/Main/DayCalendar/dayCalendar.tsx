import {useDispatch, useSelector} from "react-redux";
import React, {useContext} from "react";
import {clearCurrentData} from "../../../reducers/tasksListReducer";
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
import {getArrayByC, strToTimeNumber} from "../../../helpers/tools";
import {FILES_LOCATION, taskColors} from "../../../global/constants";
import CalendarHeader from "../../others/CalendarHeader/CalendarHeader";
import ModalWrapper from "../../others/Modals/modalWrapper/modalWrapper";
import {taskType} from "../../../global/types/stateTypes";
import InfoModal from "../../others/Modals/InfoModal/infoModal";
import {animated, useTransition} from "@react-spring/web";
import Animations from "../../../helpers/animations";
import {actions, MainContext} from "../reducer";
import Selectors from "../../../helpers/selectors";
import {DispatchType} from "../../../global/store";

const DayCalendar = () => {
    const {date, tasklist} = useSelector(Selectors.current)
    const dispatch = useDispatch<DispatchType>()

    const {dispatch: mainDispatch, scrolls, state} = useContext(MainContext)

    const RedirectToMonth = () => {
        dispatch(clearCurrentData())
        scrolls[0]()
    }
    const openTask = (i: number) => {
        mainDispatch(actions.openComponent('createModal'))
        mainDispatch(actions.setIndex(i))
        mainDispatch(actions.animateModal(true))
    }
    const openInfo = (idx: number) => {
        mainDispatch(actions.openComponent('infoModal'))
        mainDispatch(actions.setIndex(idx))
        mainDispatch(actions.animateModal(true))
    }

    if (!date) return <NoneDayCalendar/>

    return <DayCalendarMain className={'dragableMain'}>

        {(state.componentName == 'createModal' || state.componentName == 'editPage') && <ModalWrapper/>}
        {state.componentName == 'infoModal' && <InfoModal/>}

        <CalendarHeader isDay={true} close={RedirectToMonth}/>
        <DayList>
            <HoursContainer>
                {getArrayByC(24).map((i, idx) => {
                    return <HourBlock key={idx} onClick={() => {
                        if (!state.componentName) openTask(i)
                    }}>
                        <HourTime>{i}:00</HourTime>
                    </HourBlock>
                })}
                {tasklist.map((task: taskType, idx: number) => {
                    const [startTime, endTime] = [strToTimeNumber(task.starts), strToTimeNumber(task.ends) || 24]

                    return <DayTask length={endTime - startTime} top={startTime} key={idx}
                                    onClick={() => {
                                        if (!state.componentName) openInfo(idx)
                                    }}
                                    theme={taskColors[task.color]}>
                        <DayTaskTitle>{task.title}</DayTaskTitle>
                        <DayTaskTimeRange>{task.starts}-{task.ends}</DayTaskTimeRange>
                        {task.taskBackground &&
                        <DayTaskImage src={FILES_LOCATION + '/task_backgrounds/' + task.taskBackground}/>}
                    </DayTask>
                })}
                {state.componentName == 'createModal' && <NoneTask/>}
            </HoursContainer>
        </DayList>
    </DayCalendarMain>
}


const NoneDayCalendar = () => <DayCalendarMain className={'dragableMain'}>
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


const NoneTask = () => {
    const {state} = useContext(MainContext)
    const transitions = useTransition(state.isModalAnimated, Animations.widthOpacity())
    return transitions((style, item) => item ? <DayTask length={1} top={state.componentIndex || 0}
                                                        as={animated.div} style={style} theme={taskColors.blue}>
        <DayTaskTitle>(No Title)</DayTaskTitle></DayTask> : null)
}

export default DayCalendar
