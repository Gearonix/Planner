import {DATE_FORMAT, MONTHS, STATUS} from "../setup/constants"
import {DispatchType} from "../setup/store";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {StateType} from "../types/appTypes";
import {selectedDateT, taskFilterT} from "../components/Main/others/mainTypes";
import {taskListReducerType} from "../types/stateTypes";
import dayjs, {Dayjs} from "dayjs";

export const capitalizeFirstLetter = (word: string) => word[0].toUpperCase() + word.slice(1)

export const randomizeColors = () => {
    const colors = ['#FF6978', '#B2F793',
        '#7AD9FF', '#F5EEAE', '#D090FF']
    return colors[Math.floor(Math.random() * colors.length)]
}

export const generateArray = (count: number) => {
    return Array.from(Array(count).keys())
}

export const convertPromise = (state: any): taskListReducerType => JSON.parse(JSON.stringify(state));

export const numberTimeToStr = (time: number | string): string => String(time).length > 1 ? '0' + time : time + ':00'

export const strToTimeNumber = (time: string): number => +(time.split(':')[0])

export const createThunk = createAsyncThunk.withTypes<{ state: StateType, dispatch: DispatchType }>()

export const cutString = (str: string, length: number = 16) =>
    str.length > length ? str.slice(0, length) + '...' : str

export const randomizeNumber = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min)

export const isError = (data: any) => data.status === STATUS.serverError

export const getCurrentList = (taskLists: taskListReducerType, filter: taskFilterT) => {
    const {daysData, selectedDate} = taskLists
    return daysData.find(i => i.date === selectedDate.date &&
        i.month === selectedDate.month && i.year === selectedDate.year)?.tasklist
        ?.filter(item => filter[item.isTask ? 'tasks' : 'reminders']) || []
}

export const convertToDate = (value: Dayjs): selectedDateT => {
    const [year, month, date] = value.format(DATE_FORMAT).split('-')
    return {year, month, date}
}

export const convertToDayJs = (data: selectedDateT): Dayjs => {
    const {year, month, date} = data
    return dayjs(`${year}-${month},${date}`)
}

export const toMonthName = (month: string) => MONTHS[parseInt(month) - 1]

export const isDateInThisMonth = (date: selectedDateT, selectedDate: selectedDateT) =>
    date.month === selectedDate.month && date.year === selectedDate.year

export const isItLaptop = () => window.innerWidth <= 1156
