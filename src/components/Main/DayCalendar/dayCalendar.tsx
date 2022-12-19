import {useDispatch, useSelector} from "react-redux";
import React, {useContext, useEffect, useState} from "react";
import {clearCurrentData} from "../../../reducers/tasksListReducer";
import {DayCalendarInner, DayCalendarMain, DayList, HourBlock, HoursContainer, HourTime} from "./dayCalendar.styles";
import {getArrayByC} from "../../../helpers/tools";
import CalendarHeader from "../../others/CalendarHeader/CalendarHeader";
import ModalWrapper from "../../others/Modals/modalWrapper/modalWrapper";
import {taskType} from "../../../global/types/stateTypes";
import InfoModal from "../../others/Modals/InfoModal/infoModal";
import {actions, MainContext} from "../reducer";
import Selectors from "../../../helpers/selectors";
import {DispatchType} from "../../../global/store";
import {NoneDayCalendar, NoneTask, Task} from "./components";
import Animations from "../../../helpers/animations";
import {animated, useSpring} from "@react-spring/web";
import Profile from "../../Profile/profile";

const DayCalendar = () => {
    const {date, tasklist} = useSelector(Selectors.current)
    const dispatch = useDispatch<DispatchType>()
    const context = useContext(MainContext)
    const {dispatch: mainDispatch, state} = context
    const [isProfileOpen, setProfileOpened] = useState(state.isProfile)


    const RedirectToMonth = () => {
        mainDispatch(actions.closeComponent())
        mainDispatch(actions.setIndex(null))
        dispatch(clearCurrentData())
        context.scrolls[0]()
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
    const arrows = Animations.arrowMoves()
    const [arrowAnimations, arrowsApi] = useSpring(arrows.start, [])
    const opacityAnimation = useSpring(Animations.dayCalendarOpacity)
    const switchAnimation = (direction: 1 | -1) => {
        mainDispatch(actions.animateModal(true))
        arrowsApi.start(arrows[direction == -1 ? 'next' : 'prev'])
    }

    useEffect(() => {
        context.scrolls[1]()

        if (!date && !state.isProfile) return
        if (date) arrowsApi.start(arrows[!state.isProfile ? 'next' : 'prev'])

        setTimeout(() => setProfileOpened(state.isProfile), 100)
    }, [state.isProfile])

    if (!date && !state.isProfile) return <NoneDayCalendar/>

    return <DayCalendarMain className={'dragableMain'} as={animated.div}
                            style={{transform: arrowAnimations.x.to(arrows.transform)}}>
        {state.componentName == 'editPage' && <ModalWrapper/>}
        {(state.componentName == 'createModal') && <ModalWrapper/>}
        {isProfileOpen ? <Profile/> : <DayCalendarInner style={opacityAnimation} as={animated.div}>
            {state.componentName == 'infoModal' && <InfoModal/>}

            <CalendarHeader isDay={true} close={RedirectToMonth} animation={switchAnimation}/>
            <DayList>
                <HoursContainer>
                    {getArrayByC(24).map((i, idx) => {
                        return <HourBlock key={idx} onClick={() => {
                            if (!state.componentName) openTask(i)
                        }}>
                            <HourTime>{i}:00</HourTime>
                        </HourBlock>
                    })}
                    {tasklist.map((task: taskType, idx: number) => <Task task={task} openInfo={() => openInfo(idx)}/>)}
                    {state.componentName == 'createModal' && <NoneTask/>}
                </HoursContainer>
            </DayList>
        </DayCalendarInner>}

    </DayCalendarMain>
}

export default DayCalendar
