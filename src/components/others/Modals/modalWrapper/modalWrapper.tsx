import React, {useState} from 'react'
import dayjs from 'dayjs';
import {useFormik} from "formik";
import {numberTimeToStr, timeToString} from "../../../../helpers/tools";
import {DATE_FORMAT, repetitionDelays} from "../../../../global/constants";
import {isFileImage, modalValidator} from '../../../../helpers/validate';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import {useDispatch, useSelector} from "react-redux";
import {StateType} from "../../../../global/store";
import {taskType} from "../../../../global/types";
import {createTask, updateTask} from '../../../../reducers/tasksListReducer';
import {uploadFile} from "../../../../reducers/userDataReducer";
import CreateModalComponent from './createTaskModal/createTaskModal'
import EditTask from "./EditTaskModal/editTask";
import {animated, useTransition} from "@react-spring/web";
import Animations from "../../../../helpers/animations";

dayjs.extend(customParseFormat)

export type taskToServerT = {
    user_id: string | null,
    data: taskType,
}

type ModalWrapperT = {
    close: Function,
    index: number | null,
    taskData?: taskType | null
}


const ModalWrapper = ({close, index, taskData}: ModalWrapperT) => {
    const {date, year, month} = useSelector((state: StateType) => state.taskLists.current)
    const [componentError, setError] = useState<string | null>(null)
    const user_id = useSelector((state: StateType) => state.userData.user_id)
    const dispatch = useDispatch()
    const [isOpen, setIsOpen] = useState(true)

    const submitTask = async (data: taskType) => {
        if (!dayjs(data.date).isValid()) return setError('Invalid date')
        let filename = taskData?.taskBackground || null
        const file = data.taskBackground
        if (file && typeof file !== 'string') {
            if (!isFileImage(file)) return setError('Invalid background')
            // @ts-ignore
            const {payload} = await dispatch(uploadFile({file, name: 'task_backgrounds'}))
            filename = payload
        }
        const submitData: taskToServerT = {user_id, data: {...data, taskBackground: filename}}
        const callback = !!taskData ? updateTask : createTask
        // @ts-ignore
        dispatch(callback(submitData))
        close()
    }

    const initialValues: taskType = taskData || {
        title: '', starts: numberTimeToStr(index || 0), ends: numberTimeToStr(index as number + 1),
        taskBackground: null, color: 'blue', description: '',
        repetitionDelay: repetitionDelays[1], isTask: true, task_id: null,
        date: dayjs(timeToString(year || '', month || '', date || '')).format(DATE_FORMAT)
    }

    const formik = useFormik({initialValues, onSubmit: submitTask, validate: modalValidator})
    const componentProps = {
        formik, close: () => {
            setIsOpen(false)
        }, error: componentError
    }


    const AnimatedCreateModal = animated(CreateModalComponent)
    const transitions = useTransition(isOpen, Animations.scale(close))

    return !taskData ? transitions((style, item) => item ? <AnimatedCreateModal {...componentProps} style={style}/>
        : null) : <EditTask {...componentProps} />
}

export default ModalWrapper
