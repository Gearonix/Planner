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
import DayModal from "./Modal/Modal";
import { taskType} from "../../../global/types";
import InfoModal from "./InfoModal/infoModal";

type dayCalendarProps = {
    toToday : Function,
    modalIndex : number | null,
    setModalIndex : Function
}


const DayCalendar = ({toToday,modalIndex,setModalIndex} : dayCalendarProps) => {
    const {date,  tasklist} = useSelector((state: StateType) => state.taskLists.current)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [infoModalIdx, setInfoModal] = useState<number | null>(null)
    const RedirectToMonth  = () => {
        dispatch(clearCurrentData())
    }
    if (!date){
        navigate('/month')
    }
    const isModalOpened = modalIndex!==null && infoModalIdx==null
    const isInfoModalOpened = modalIndex==null && infoModalIdx!=null



    const Hours = getArrayByC(24).map((i,idx) => {
        return <HourBlock key={idx} onClick={() => {
            if (!isModalOpened && !isInfoModalOpened) setModalIndex(i)

        }}>
            <HourTime>{i}:00</HourTime>
        </HourBlock>
    })

    const createTask = (task : taskType,idx : number) => {
        const [startTime,endTime] = [+task.starts.split(':')[0], +task.ends.split(':')[0] || 24]
        //@ts-ignore
        return  <DayTask color={taskColors[task.color]} length={endTime - startTime} top={startTime}
                         key={idx} onClick={() => {
            if (!isModalOpened && !isInfoModalOpened) setInfoModal(idx)
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
        {isModalOpened && <DayTask color={taskColors.blue} length={1} top={modalIndex}>
            <DayTaskTitle>(No Title)</DayTaskTitle></DayTask>
        }
    </>

    return <DayCalendarMain className={'dragableMain'}>
        {isModalOpened && <DayModal close={() => setModalIndex(null)}
                                               index={modalIndex}/>}
        {isInfoModalOpened && <InfoModal task={tasklist[infoModalIdx]} close={() => setInfoModal(null)}/>}
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
