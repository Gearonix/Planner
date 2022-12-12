import React, {useState} from 'react'
import dayjs from 'dayjs';
import {useFormik} from "formik";
import { numberTimeToStr, timeToString} from "../../../../global/tools";
import {DATE_FORMAT, repetitionDelays} from "../../../../global/constants";
import {isFileImage, modalValidator} from '../../../../global/validate';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import {useDispatch, useSelector} from "react-redux";
import {StateType} from "../../../../global/store";
import {taskType} from "../../../../global/types";
import {createTask} from '../../../../reducers/tasksListReducer';
import {uploadFile} from "../../../../reducers/userDataReducer";
import CreateModalComponent from './createModalUI/createModalUI'
import EditTask from "../../EditTask/editTask";
dayjs.extend(customParseFormat)

const CreateTaskModal = ({close, index}: { close: Function, index: number | null }) => {
    const {date, year, month} = useSelector((state: StateType) => state.taskLists.current)
    const [componentError,setError] = useState<string | null>(null)
    const dispatch = useDispatch()
    const submitTask = async (data: taskType) => {
        debugger
        if (!dayjs(date).isValid()) return setError('Invalid date')
        let filename = null
        const file = data.taskBackground
        if (file) {
            if (!isFileImage(file)) return setError('Invalid background')
            // @ts-ignore
            const {payload} = await dispatch(uploadFile({file, name: 'task_backgrounds'}))
            filename = payload
        }
        // @ts-ignore
        dispatch(createTask({user_id, data: {...data,taskBackground : filename}}))
        close()

    }
    const numberIdx = numberTimeToStr(index || 0)
    const initialValues: taskType = {
        title: '', starts: numberIdx, ends: numberIdx, taskBackground: null, color: 'blue', description: '',
        repetitionDelay: repetitionDelays[1], isTask : true,  task_id : null,
        date : dayjs(timeToString(year || '',month || '',date || '')).format(DATE_FORMAT),}

    const formik = useFormik({initialValues, onSubmit: submitTask, validate: modalValidator})
    const componentProps = {formik,close,error : componentError}
    const test = true
    // @ts-ignore
    return test ? <CreateModalComponent {...componentProps}/> : <EditTask {...componentProps}/>
}

export default CreateTaskModal
