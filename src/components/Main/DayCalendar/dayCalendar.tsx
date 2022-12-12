import {useDispatch, useSelector} from "react-redux";
import {StateType} from "../../../global/store";
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import { clearCurrentData } from "../../../reducers/tasksListReducer";
import { DayCalendarMain, DayList, DayTask,
    DayTaskImage,
    DayTaskTimeRange, DayTaskTitle, HourBlock, HoursContainer, HourTime } from "./dayCalendar.styles";
import {getArrayByC} from "../../../global/tools";
import {FILES_LOCATION, taskColors} from "../../../global/constants";
import CalendarHeader from "../CalendarHeader/CalendarHeader";
import CreateTaskModal from "../Modals/CreateTaskModal/CreateModal";
import { taskType} from "../../../global/types";
import InfoModal from "../Modals/InfoModal/infoModal";
import EditTask from "../EditTask/editTask";

type dayCalendarProps = {
    toToday : Function
}


const DayCalendar = ({toToday} : dayCalendarProps) => {
    const {date,  tasklist} = useSelector((state: StateType) => state.taskLists.current)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const RedirectToMonth  = () => {dispatch(clearCurrentData())}

    type compValueType = 'createModal' | 'infoModal' | 'editPage' | null
    const [componentName,openComponent] = useState<compValueType>(null)
    const [componentIndex,setIndex] = useState<number | null>(null)

    if (!date) navigate('/month')

    const Hours = getArrayByC(24).map((i,idx) => {
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

        {componentName == 'createModal' && <CreateTaskModal close={closeComponent}
                                           index={componentIndex}/>}

        {componentName == 'infoModal' && <InfoModal task={tasklist[componentIndex || 0]}
                                                    close={closeComponent}
        editTask={() => {openComponent('editPage')}}/>}
        {componentName == 'editPage' && <CreateTaskModal close={closeComponent}
                                                         index={componentIndex}/>}
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
