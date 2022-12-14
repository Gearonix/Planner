import {useDispatch, useSelector} from "react-redux";
import {StateType} from "../../../global/store";
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
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
import {getArrayByC} from "../../../helpers/tools";
import {FILES_LOCATION, taskColors} from "../../../global/constants";
import CalendarHeader from "../../others/CalendarHeader/CalendarHeader";
import ModalWrapper from "../../others/Modals/modalWrapper/modalWrapper";
import {taskType} from "../../../global/types";
import InfoModal from "../../others/Modals/InfoModal/infoModal";
import {mainStatesT} from "../main";
import {animated, useTransition} from "@react-spring/web";
import Animations from "../../../helpers/animations";

type dayCalendarProps = {
    toToday: Function,
    states: mainStatesT,
    scrollTo: Function
}


const DayCalendar = ({toToday, states, scrollTo}: dayCalendarProps) => {
    const {date, tasklist} = useSelector((state: StateType) => state.taskLists.current)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [isModalOpened, setIsModalOpen] = useState(true)
    const RedirectToMonth = () => {
        dispatch(clearCurrentData())
        scrollTo()
    }
    const {component: [componentName, openComponent], index: [componentIndex, setIndex]} = states


    if (!date) return <NoneDayCalendar/>

    const Hours = getArrayByC(24).map((i, idx) => {
        return <HourBlock key={idx} onClick={() => {
            if (!componentName) {
                openComponent('createModal')
                setIndex(i)
                setIsModalOpen(true)
            }

        }}>
            <HourTime>{i}:00</HourTime>
        </HourBlock>
    })
    const createTask = (task: taskType, idx: number) => {
        const [startTime, endTime] = [+task.starts.split(':')[0], +task.ends.split(':')[0] || 24]
        //@ts-ignore
        return <DayTask color={taskColors[task.color]} length={endTime - startTime} top={startTime}
                        key={idx} onClick={() => {
            if (!componentName) {
                openComponent('infoModal')
                setIndex(idx)
                setIsModalOpen(true)
            }
        }}>
            <DayTaskTitle>{task.title}</DayTaskTitle>
            <DayTaskTimeRange>{task.starts}-{task.ends}</DayTaskTimeRange>
            {task.taskBackground && <DayTaskImage src={FILES_LOCATION + '/task_backgrounds/' +
            task.taskBackground}/>}
        </DayTask>
    }
    const DayTasks = <>
        {tasklist.map(createTask)}
        {/*@ts-ignore*/}
        {componentName == 'createModal' && <NoneTask index={componentIndex}
                                                     opened={isModalOpened}/>
        }
    </>
    const closeComponent = () => {

        openComponent(null)
        setIsModalOpen(false)
    }

    return <DayCalendarMain className={'dragableMain'}>

        {(componentName == 'createModal'
            || componentName == 'editPage') && <ModalWrapper close={closeComponent}
                                                             index={componentIndex}
                                                             taskData={componentName == 'editPage'
                                                                 ? tasklist[componentIndex || 0] : null}/>}

        {componentName == 'infoModal' && <InfoModal task={tasklist[componentIndex || 0]}
                                                    close={closeComponent}
                                                    editTask={() => {
                                                        openComponent('editPage')
                                                    }}/>}
        <CalendarHeader isDay={true} close={RedirectToMonth} toToday={toToday}/>
        <DayList>
            <HoursContainer>
                {Hours}
                {DayTasks}
            </HoursContainer>
        </DayList>
    </DayCalendarMain>
}


const NoneDayCalendar = () => {
    const Hours = getArrayByC(24).map((i, idx) => {
        return <HourBlock key={idx}>
            <HourTime>{i}:00</HourTime>
        </HourBlock>
    })
    return <DayCalendarMain className={'dragableMain'}>
        <DayList>
            <HoursContainer>
                {Hours}
            </HoursContainer>
        </DayList>
    </DayCalendarMain>
}


const NoneTask = ({index, opened}: { index: number | null, opened: boolean, open: Function }) => {
    const transitions = useTransition(opened, Animations.widthOpacity())
    // @ts-ignore
    return transitions((style, item) => item ? <DayTask color={taskColors.blue} length={1} top={index}
                                                        as={animated.div} style={style}>
        <DayTaskTitle>(No Title)</DayTaskTitle></DayTask> : null)
}

export default DayCalendar
