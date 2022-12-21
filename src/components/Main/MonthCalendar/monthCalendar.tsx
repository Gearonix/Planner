import React, {useContext, useEffect} from "react";
import {DATE_FORMAT} from "../../../global/constants";
import {MonthBlock} from "./monthCalendar.styles";
import {useDispatch, useSelector} from "react-redux";
import {actions, MainContext} from "../reducer";
import Selectors from "../../../helpers/selectors";
import {setCurrentData} from "../../../reducers/tasksListReducer";
import {animated, useSpring} from "@react-spring/web";
import Animations from "../../../helpers/animations";
import {Calendar} from 'antd';
import {Dayjs} from "dayjs";
import {CellRender} from "./utils";


const MonthCalendar = () => {
    const {month, year, date: currentDate} = useSelector(Selectors.taskLists)
    const daysData = useSelector(Selectors.daysData)
    const user_id = useSelector(Selectors.userId)
    const dispatch = useDispatch()

    const context = useContext(MainContext)
    const mainState = context.state

    const clickToDay = (value: Dayjs) => {
        context.dispatch(actions.closeModal())
        context.dispatch(actions.setIndex(null))
        const fulldate = value.format(DATE_FORMAT)

        const [curYear, curMonth, curDate] = fulldate.split('-')
        if (year != curYear || month != curMonth && currentDate == curDate) return
        context.dispatch(actions.openComponent('day'))
        dispatch(setCurrentData({user_id, fulldate}))
        context.scrolls[1]()
    }


    useEffect(() => {
        if (mainState.componentName == 'profile') context.scrolls[1]()
    }, [])

    const [animations, api] = useSpring(Animations.arrowMoves().start, [])
    const animateMonth = (direction: 1 | -1) => api.start(Animations.arrowMoves()[direction == -1 ? 'next' : 'prev'])

    return <MonthBlock as={animated.div}
                       style={{transform: animations.x.to(Animations.arrowMoves().transform)}}>
        <Calendar dateCellRender={CellRender(daysData)} onSelect={clickToDay} headerRender={() => null}/>;
    </MonthBlock>

}


export default MonthCalendar
