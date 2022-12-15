import {StateType} from "../global/types/types";

const Selectors = {
    userId: (state: StateType) => state.userData.user_id || '',
    taskLists: (state: StateType) => state.taskLists,
    daysData: (state: StateType) => state.taskLists.daysData,
    current: (state: StateType) => state.taskLists.current


}


export default Selectors
