import {useDispatch, useSelector} from "react-redux";
import {StateType} from "../../../global/store";
import React from "react";
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


type dayCalendarProps = {
    toToday: Function,
    states: mainStatesT
}


const DayCalendar = ({toToday, states}: dayCalendarProps) => {
    const {date, tasklist} = useSelector((state: StateType) => state.taskLists.current)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const RedirectToMonth = () => {
        dispatch(clearCurrentData())
    }
    const {component: [componentName, openComponent], index: [componentIndex, setIndex]} = states

    if (!date) navigate('/month')

    const Hours = getArrayByC(24).map((i, idx) => {
        return <HourBlock key={idx} onClick={() => {
            if (!componentName){
                openComponent('createModal')
                setIndex(i)
            }

        }}>
            <HourTime>{i}:00</HourTime>
        </HourBlock>
    })

    const createTask = (task : taskType,idx : number) => {
        const [startTime,endTime] = [+task.starts.split(':')[0], +task.ends.split(':')[0] || 24]
        //@ts-ignore
        return  <DayTask color={taskColors[task.color]} length={endTime - startTime} top={startTime}
                         key={idx} onClick={() => {
            if (!componentName) {
                openComponent('infoModal')
                setIndex(idx)
            }
        }}>
                <DayTaskTitle>{task.title}</DayTaskTitle>
        <DayTaskTimeRange>{task.starts}-{task.ends}</DayTaskTimeRange>
        {task.taskBackground && <DayTaskImage src={FILES_LOCATION + '/task_backgrounds/' +
        task.taskBackground} />}
        </DayTask>
    }
    const DayTasks = <>
        {tasklist.map(createTask)}
        {/*@ts-ignore*/}
        {componentName == 'createModal' && <DayTask color={taskColors.blue} length={1} top={componentIndex}>
            <DayTaskTitle>(No Title)</DayTaskTitle></DayTask>
        }
    </>
    const closeComponent = () => openComponent(null)

    return <DayCalendarMain className={'dragableMain'}>

        {componentName == 'createModal' && <ModalWrapper close={closeComponent}
                                                         index={componentIndex}/>}

        {componentName == 'infoModal' && <InfoModal task={tasklist[componentIndex || 0]}
                                                    close={closeComponent}
                                                    editTask={() => {
                                                        openComponent('editPage')
                                                    }}/>}
        {componentName == 'editPage' && <ModalWrapper close={closeComponent}
                                                      index={componentIndex} taskData={tasklist[componentIndex || 0]}/>}
        <CalendarHeader isDay={true} close={RedirectToMonth} toToday={toToday}/>
        <DayList>
            <HoursContainer>
                {Hours}
                {DayTasks}
            </HoursContainer>
        </DayList>
    </DayCalendarMain>
}

export default DayCalendar
