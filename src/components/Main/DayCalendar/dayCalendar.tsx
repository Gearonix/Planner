import {useDispatch, useSelector} from "react-redux";
import {StateType} from "../../../global/store";
import React from "react";
import {useNavigate} from "react-router-dom";
import { clearCurrentData } from "../../../reducers/tasksListReducer";
import { DayCalendarMain, DayList, DayTask,
    DayTaskImage,
    DayTaskTimeRange, DayTaskTitle, HourBlock, HoursContainer, HourTime } from "./dayCalendar.styles";
import { getArrayByC} from "../../../global/tools";
import { taskColors } from "../../../global/constants";
import { CalendarHeaderC } from "../main";




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

    return <DayCalendarMain>
        <CalendarHeaderC isDay={true} close={RedirectToMonth} toToday={toToday}/>
        {/*@ts-ignore*/}

        <DayList>
            <HoursContainer>
                {getArrayByC(24).map((i,idx) => {
                    return <HourBlock key={idx}>
                        <HourTime>{i}:00</HourTime>
                    </HourBlock>
                })}
                {tasklist.map((task,idx) => {
                    const [startTime,endTime] = [+task.starts.split(':')[0], +task.ends.split(':')[0]]
                        // @ts-ignore
                    return <DayTask color={taskColors[task.color]} length={endTime - startTime} top={startTime} key={idx}>
                        <DayTaskTitle>{task.title}</DayTaskTitle>
                        <DayTaskTimeRange>{task.starts}-{task.ends}</DayTaskTimeRange>
                        {task.taskBackground && <DayTaskImage />}

                    </DayTask>
                })}


            </HoursContainer>


        </DayList>
    </DayCalendarMain>
}

export default DayCalendar
