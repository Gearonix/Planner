import React, {useContext} from 'react'
import dayjs from 'dayjs';
import {useFormik} from "formik";
import {isFileImage, modalValidator} from '../../../../utils/validate';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import {useDispatch, useSelector} from "react-redux";
import {taskType} from "../../../../types/stateTypes";
import CreateModalComponent from './createTaskModal/createTaskModal'
import EditTask from "./EditTaskModal/editTask";
import {animated} from "@react-spring/web";
import {actions, MainContext} from "../../../Main/utils/reducer";
import Selectors from "../../../../helpers/selectors";
import {DispatchType} from "../../../../setup/store";
import {createAnimation, createInitialValues} from './utils';
import {uploadFile} from '../../../../setup/reducers/userDataReducer';
import {taskToServerT} from '../../../Main/others/mainTypes';
import {createTask, updateTask} from '../../../../setup/reducers/tasksListReducer';
import {convertToDayJs, getCurrentList} from "../../../../utils/tools";

dayjs.extend(customParseFormat)

const ModalWrapper = () => {
    const user_id = useSelector(Selectors.userId)
    const dispatch = useDispatch<DispatchType>()
    const taskLists = useSelector(Selectors.taskLists)
    const selectedDate = useSelector(Selectors.selectedDate)
    const taskList = getCurrentList(taskLists)


    const context = useContext(MainContext)
    const mainState = context.state
    const modalIdx = mainState.modalIndex
    const task = mainState.modalComponent === 'editPage' ? taskList[modalIdx || 0] : null


    const submitTask = async (data: taskType) => {
        if (!convertToDayJs(data.selectedDate).isValid()) return context.dispatch(actions.setError('Invalid date'))

        let filename = task?.taskBackground || null
        const file = data.taskBackground

        if (file && typeof file !== 'string') {
            if (!isFileImage(file)) return context.dispatch(actions.setError('Invalid background'))
            const {payload} = await dispatch(uploadFile({file, name: 'task_backgrounds'}))
            filename = payload
        }

        const submitData: taskToServerT = {user_id, data: {...data, taskBackground: filename}}
        const callback = task ? updateTask : createTask
        // @ts-ignore
        dispatch(callback(submitData))
        context.dispatch(actions.closeModal())
    }
    const initialValues: taskType = task || createInitialValues(mainState, selectedDate)

    const formik = useFormik({initialValues, onSubmit: submitTask, validate: modalValidator})

    const componentProps = {
        formik,
        startClosing: () => {
            context.dispatch(actions.animate(false))
        },
        error: mainState.componentError
    }

    const animate = createAnimation(context.closeModal, mainState.isModalAnimating)
    const Render = !task ? animated(CreateModalComponent) : animated(EditTask)


    return animate(!task)((style, item) => item ? <Render {...componentProps} style={style}/> : null)
}

export default ModalWrapper
