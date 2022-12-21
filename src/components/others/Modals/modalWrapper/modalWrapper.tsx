import React, {useContext} from 'react'
import dayjs from 'dayjs';
import {useFormik} from "formik";
import {numberTimeToStr, timeToString} from "../../../../helpers/tools";
import {DATE_FORMAT, repetitionDelays} from "../../../../global/constants";
import {isFileImage, modalValidator} from '../../../../helpers/validate';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import {useDispatch, useSelector} from "react-redux";
import {taskType} from "../../../../global/types/stateTypes";
import {createTask, deleteTask, updateTask} from '../../../../reducers/tasksListReducer';
import {uploadFile} from "../../../../reducers/userDataReducer";
import CreateModalComponent from './createTaskModal/createTaskModal'
import EditTask from "./EditTaskModal/editTask";
import {animated, useTransition} from "@react-spring/web";
import Animations from "../../../../helpers/animations";
import {actions, MainContext} from "../../../Main/reducer";
import {taskToServerT} from "../../../../global/types/components/mainTypes";
import Selectors from "../../../../helpers/selectors";
import {DispatchType} from "../../../../global/store";

dayjs.extend(customParseFormat)

const ModalWrapper = () => {
    const current = useSelector(Selectors.current)
    const user_id = useSelector(Selectors.userId)
    const dispatch = useDispatch<DispatchType>()

    const context = useContext(MainContext)
    const mainState = context.state

    const taskData = mainState.modalComponent == 'editPage' ?
        current.tasklist[mainState.componentIndex || 0] : null


    const submitTask = async (data: taskType) => {
        if (!dayjs(data.date).isValid()) return context.dispatch(actions.setError('Invalid date'))

        let filename = taskData?.taskBackground || null
        const file = data.taskBackground
        if (file && typeof file != 'string') {
            if (!isFileImage(file)) return context.dispatch(actions.setError('Invalid background'))

            const {payload} = await dispatch(uploadFile({file, name: 'task_backgrounds'}))
            filename = payload
        }

        const submitData: taskToServerT = {user_id, data: {...data, taskBackground: filename}}
        const callback = !!taskData ? updateTask : createTask
        dispatch(callback(submitData))
        context.dispatch(actions.closeModal())
    }


    const initialValues: taskType = taskData || {
        title: '', starts: numberTimeToStr(mainState.componentIndex || 0), ends: numberTimeToStr(
            mainState.componentIndex as number + 1),
        taskBackground: null, color: 'blue', description: '',
        repetitionDelay: repetitionDelays[1], isTask: true, task_id: null,
        date: dayjs(timeToString(current.year || '', current.month || '', current.date || '')).format(DATE_FORMAT)
    }

    const formik = useFormik({initialValues, onSubmit: submitTask, validate: modalValidator})

    const componentProps = {
        formik, close: () => {
            context.dispatch(actions.animateModal(false))
        }, error: mainState.componentError
    }
    const closeComponent = () => {
        context.dispatch(actions.closeModal())
        console.log(mainState.DeletingTaskId)
        if (mainState.DeletingTaskId == taskData?.task_id && mainState.DeletingTaskId != null) {
            dispatch(deleteTask(taskData?.task_id || ''))
            context.dispatch(actions.setDeletingTask(null))
        }
    }

    const AnimatedCreateModal = animated(CreateModalComponent)
    const AnimatedEditTask = animated(EditTask)

    const createModalTransitions = useTransition(mainState.isModalAnimated,
        Animations.scale(() => closeComponent()))
    const editTaskTransitions = useTransition(mainState.isModalAnimated,
        Animations.opacity(() => closeComponent()))

    return !taskData ? createModalTransitions((style, item) => item ?
        <AnimatedCreateModal {...componentProps} style={style}/>
        : null) : editTaskTransitions((style, item) => item ?
        <AnimatedEditTask {...componentProps} style={style}/> : null)
}

export default ModalWrapper
