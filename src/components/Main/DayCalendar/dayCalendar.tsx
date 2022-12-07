import {useDispatch, useSelector} from "react-redux";
import {StateType} from "../../../global/store";
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import { clearCurrentData } from "../../../reducers/tasksListReducer";
import { DayCalendarMain, DayList, DayTask,
    DayTaskImage,
    DayTaskTimeRange, DayTaskTitle, HourBlock, HoursContainer, HourTime } from "./dayCalendar.styles";
import {getArrayByC, getInitialTaskType, timeToString} from "../../../global/tools";
import { taskColors } from "../../../global/constants";
import CalendarHeader from "../CalendarHeader/CalendarHeader";
import DayModal from "./Modal/Modal";
import {MainElement} from "../main.styles";
import {refType, taskListType, taskType} from "../../../global/types";

export type modalCoordsType = {
    x : number | null,
    y : number | null,
    index : number | null,
    taskData : taskType
}


const DayCalendar = ({toToday} : {toToday : Function}) => {
    const {date,  tasklist,year,month} = useSelector((state: StateType) => state.taskLists.current)
    const fulldate = timeToString(year as string,month as string,date as string)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const RedirectToMonth  = () => {
        dispatch(clearCurrentData())
    }
    if (!date){
        navigate('/month')
    }
    const initialModalCoords = {x : null, y : null, index: null ,taskData : getInitialTaskType(0,fulldate)}

    const [modalCoords,setModalCoords] = useState<modalCoordsType>(initialModalCoords)

    const openModal = (index : number) => ({clientX : x, clientY : y} : React.MouseEvent) => {
        setModalCoords({x,y,index,taskData : getInitialTaskType(index,fulldate)})
    }

    const Hours = getArrayByC(24).map((i,idx) => {
        return <HourBlock key={idx} onClick={openModal(i)}>
            <HourTime>{i}:00</HourTime>
        </HourBlock>
    })

    const createTask = (task : taskType,idx : number) => {

        const [startTime,endTime] = [+task.starts.split(':')[0], +task.ends.split(':')[0] || 24]
        // @ts-ignore

        return  <DayTask color={taskColors[task.color]} length={endTime - startTime} top={startTime} key={idx}>
                <DayTaskTitle>{task.title}</DayTaskTitle>
        <DayTaskTimeRange>{task.starts}-{task.ends}</DayTaskTimeRange>
        {task.taskBackground && <DayTaskImage />}
        </DayTask>
    }


    const DayTasks = <>
        {tasklist.map(createTask)}
        {modalCoords.index!==null && createTask(modalCoords.taskData,0)}
    </>



    return <DayCalendarMain className={'dragableMain'}>
        {modalCoords.index!==null && <DayModal close={() => setModalCoords(initialModalCoords)} coords={modalCoords}/>}
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
