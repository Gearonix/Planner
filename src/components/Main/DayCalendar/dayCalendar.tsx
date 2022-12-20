import {useSelector} from "react-redux";
import React, {useContext, useEffect, useState} from "react";
import {DayCalendarInner, DayCalendarMain, DayList, HourBlock, HoursContainer, HourTime} from "./dayCalendar.styles";
import {getArrayByC} from "../../../helpers/tools";
import ModalWrapper from "../../others/Modals/modalWrapper/modalWrapper";
import {taskType} from "../../../global/types/stateTypes";
import InfoModal from "../../others/Modals/InfoModal/infoModal";
import {actions, MainContext} from "../reducer";
import Selectors from "../../../helpers/selectors";
import {NoneDayCalendar, NoneTask, Task} from "./components";
import Animations from "../../../helpers/animations";
import {animated, useSpring} from "@react-spring/web";
import Profile from "../../Profile/profile";
import {modalComponentT} from "../../../global/types/components/mainTypes";

const DayCalendar = () => {
    const {date, tasklist} = useSelector(Selectors.current)
    const context = useContext(MainContext)
    const {dispatch: mainDispatch, state} = context
    const isProfile = state.componentName == 'profile'
    const [isProfileOpen, setProfileOpened] = useState(isProfile)

    const openModal = (idx: number, name: modalComponentT) => {
        mainDispatch(actions.openModal(name))
        mainDispatch(actions.setIndex(idx))
        mainDispatch(actions.animateModal(true))
    }

    const arrows = Animations.arrowMoves()
    const [arrowAnimations, arrowsApi] = useSpring(arrows.start, [])
    const opacityAnimation = useSpring(Animations.dayCalendarOpacity)

    useEffect(() => {
        context.scrolls[1]()

        if (!date && !isProfile) return
        if (date) arrowsApi.start(arrows[!isProfile ? 'next' : 'prev'])

        setTimeout(() => setProfileOpened(isProfile), 100)
    }, [isProfile])

    if (!date && !isProfile) return <NoneDayCalendar/>

    return <DayCalendarMain className={'dragableMain'} as={animated.div}
                            style={{transform: arrowAnimations.x.to(arrows.transform)}}>
        {state.modalComponent == 'editPage' && <ModalWrapper/>}
        {(state.modalComponent == 'createModal') && <ModalWrapper/>}
        {isProfileOpen ? <Profile/> : <DayCalendarInner style={opacityAnimation} as={animated.div}>
            {state.modalComponent == 'infoModal' && <InfoModal/>}
            <DayList>
                <HoursContainer>
                    {getArrayByC(24).map((i, idx) => {
                        return <HourBlock key={idx} onClick={() => {
                            if (!state.modalComponent) openModal(i, 'createModal')
                        }}>
                            <HourTime>{i}:00</HourTime>
                        </HourBlock>
                    })}
                    {tasklist.map((task: taskType, idx: number) =>
                        <Task task={task} openInfo={() => openModal(idx, 'infoModal')}/>)}
                    {state.modalComponent == 'createModal' && <NoneTask/>}
                </HoursContainer>
            </DayList>
        </DayCalendarInner>}

    </DayCalendarMain>
}

export default DayCalendar
