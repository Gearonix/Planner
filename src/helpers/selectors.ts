import {StateType} from "../types/appTypes";

const Selectors = {
    userId: (state: StateType) => state.userData.user_id || '',
    taskLists: (state: StateType) => state.taskLists,
    daysData: (state: StateType) => state.taskLists.daysData,
    userName: (state: StateType) => state.userData.userName,
    userData: (state: StateType) => state.userData,
    selectedDate: (state: StateType) => state.taskLists.selectedDate

}


export default Selectors
