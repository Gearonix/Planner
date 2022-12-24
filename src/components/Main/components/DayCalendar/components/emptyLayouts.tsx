import {DayTask, DayTaskTitle,} from "../dayCalendar.styles";
import React, {useContext} from "react";
import {MainContext} from "../../../utils/reducer";
import {animated, useTransition} from "@react-spring/web";
import Animations from "../../../../../helpers/animations";
import {taskColors} from "../../../../../setup/constants";


export const NoneTask = () => {
    const {state} = useContext(MainContext)
    const transitions = useTransition(state.isModalAnimating, Animations.widthOpacity())

    return transitions((style, item) => {
        return item ? <DayTask length={1} top={state.modalIndex || 0}
                               as={animated.div} style={{
            ...style, width: style.width.to(i => i + '%')
        }} theme={taskColors.blue} isTask={true}>
            <DayTaskTitle>(No Title)</DayTaskTitle></DayTask> : null
    })
}
