import {numberTimeToStr} from "../../../../utils/tools";
import {repetitionDelays} from "../../../../setup/constants";
import {mainStateT, selectedDateT} from "../../../Main/others/mainTypes";
import {useTransition} from "@react-spring/web";
import Animations from "../../../../helpers/animations";

export const createInitialValues = (state: mainStateT, selectedDate: selectedDateT) => ({
    title: '', starts: numberTimeToStr(state.modalIndex || 0), ends: numberTimeToStr(
        state.modalIndex as number + 1),
    taskBackground: null, color: 'blue', description: '',
    repetitionDelay: repetitionDelays[1], isTask: true, task_id: null,
    selectedDate
})

export const createAnimation = (callback: Function, isAnimated: boolean) => (edit: boolean) => {
    return useTransition(isAnimated, Animations[edit ? 'scale' : 'opacity'](() => callback()))
}


