import {useDispatch, useSelector} from "react-redux";
import {StateType} from "../../../global/store";
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import { clearCurrentData } from "../../../reducers/tasksListReducer";
import { DayCalendarMain, DayList, DayTask,
    DayTaskImage,
    DayTaskTimeRange, DayTaskTitle, HourBlock, HoursContainer, HourTime } from "./dayCalendar.styles";
import {getArrayByC} from "../../../global/tools";
import { taskColors } from "../../../global/constants";
import CalendarHeader from "../CalendarHeader/CalendarHeader";
import DayModal from "./Modal/Modal";
import { taskType} from "../../../global/types";

const DayCalendar = ({toToday} : {toToday : Function}) => {
    const {date,  tasklist} = useSelector((state: StateType) => state.taskLists.current)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const RedirectToMonth  = () => {
        dispatch(clearCurrentData())
    }
    if (!date){
        navigate('/month')
    }

    const [modalIndex,setModalIndex] = useState<number | null>(null)

    const Hours = getArrayByC(24).map((i,idx) => {
        return <HourBlock key={idx} onClick={() => setModalIndex(i)}>
            <HourTime>{i}:00</HourTime>
        </HourBlock>
    })

    const createTask = (task : taskType,idx : number) => {
        const [startTime,endTime] = [+task.starts.split(':')[0], +task.ends.split(':')[0] || 24]
        //@ts-ignore
        return  <DayTask color={taskColors[task.color]} length={endTime - startTime} top={startTime} key={idx}>
                <DayTaskTitle>{task.title}</DayTaskTitle>
        <DayTaskTimeRange>{task.starts}-{task.ends}</DayTaskTimeRange>
        {task.taskBackground && <DayTaskImage />}
        </DayTask>
    }

    const DayTasks = <>
        {tasklist.map(createTask)}
        {/*@ts-ignore*/}
        {modalIndex!==null && <DayTask color={taskColors.blue} length={1} top={modalIndex.index}>
            <DayTaskTitle>(No Title)</DayTaskTitle></DayTask>
        }
    </>

    return <DayCalendarMain className={'dragableMain'}>
        {modalIndex!==null && <DayModal close={() => setModalIndex(null)}
                                               index={modalIndex}/>}
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
