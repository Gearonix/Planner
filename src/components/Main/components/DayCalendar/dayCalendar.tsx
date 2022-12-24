import React, {useContext, useEffect} from "react";
import {DayCalendarInner, DayCalendarMain, DayList} from "./dayCalendar.styles";
import ModalWrapper from "../../../others/Modals/modalWrapper/modalWrapper";
import InfoModal from "../../../others/Modals/InfoModal/infoModal";
import {actions, MainContext} from "../../utils/reducer";
import Animations from "../../../../helpers/animations";
import {animated, useSpring} from "@react-spring/web";
import Profile from "../../../Profile/profile";
import {HoursWrapper} from "./components/hours";
import {useDispatch, useSelector} from "react-redux";
import Selectors from "../../../../helpers/selectors";
import {getCurrentList} from "../../../../utils/tools";
import {DispatchType} from "../../../../setup/store";
import {deleteTask} from "../../../../setup/reducers/tasksListReducer";

const DayCalendar = () => {
    const context = useContext(MainContext)
    const {dispatch: mainDispatch, state} = context
    const taskLists = useSelector(Selectors.taskLists)
    const taskList = getCurrentList(taskLists, state.filter)
    const dispatch = useDispatch<DispatchType>()

    const deleteTaskById = (task_id: string) => () => {
        if (state.deletingTaskId) {
            mainDispatch(actions.setDeletingTask(null))
            dispatch(deleteTask(task_id))
        }
    }

    const initialAnimation = useSpring(Animations.springOpacity)

    useEffect(() => {
        if (state.range === 'month') {
            context.scrolls.toMonth()
            context.closeModal()
        }
        if (state.isProfile) {
            context.dispatch(actions.animateComponent(true))
        }
    }, [state.range, state.isProfile])

    return <DayCalendarMain>
        {(state.modalComponent === 'createModal' || state.modalComponent === 'editPage') && <ModalWrapper/>}
        {state.modalComponent === 'infoModal' && <InfoModal/>}
        {state.isProfile ? <Profile/> : <DayCalendarInner style={{...initialAnimation}} as={animated.div}>
            <DayList className={'draggableElement'}>
                <HoursWrapper openModal={context.openModal} tasklist={taskList} deleteTask={deleteTaskById}
                              state={state}/>
            </DayList>
        </DayCalendarInner>
        }
    </DayCalendarMain>
}


export default DayCalendar
