import {MONTHS, taskColors} from "../global/constants"
import {DispatchType} from "../global/store";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {nor, StateType} from "../global/types/types";

export const capitalizeFirstLetter = (word: string) => word[0].toUpperCase() + word.slice(1)

export const randomizeColors = () => {
    const colors = ['#FF6978', '#B2F793',
        '#7AD9FF', '#F5EEAE', '#D090FF']
    return colors[Math.floor(Math.random() * colors.length)]
}
export const formatNum = (number: number) => {
    return number.toString().length == 1 ? '0' + number : number.toString()
}
export const formatWeekDay = (day: number) => {
    const names = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    return names[day]
}


export const timeToString = (year: string, month: string, date: string): string => [year, month, date].join('-')

export const stringToTime = (fulldate: string) => fulldate.split('-')

export const createDateData = (user_id: string, fulltime: string) => {
    const [year, month, day] = stringToTime(fulltime)
    return {date: day, month, year, user_id, tasklist: [], _id: null}
}


export const createDaysAmount = (year: string, month: string | number) => {
    const date = new Date(+year, +month, 0);
    return date.getDate()
}


export const generateCalendarArray = (weekDay: number, amount: number) => {
    const valuesArray = [7 - weekDay]
    while (true) {
        const sum = valuesArray.reduce((a, b) => a + b, 0)
        if (sum + 7 >= amount) break
        valuesArray.push(7)

    }
    const sum = valuesArray.reduce((a, b) => a + b, 0)
    valuesArray.push(amount - sum)
    return valuesArray
}
// @ts-ignore
export const getArrayByC = (count: number) => [...Array(count).keys()]

export const convertPromise = (state: any) => JSON.parse(JSON.stringify(state));


export const formatMonth = (month: number = new Date().getMonth()) => formatNum(month + 1)


export const toMonthName = (month: string) => MONTHS[parseInt(month) - 1]

export const ValidateMonthChange = (year: number, month: number) => {
    let arr = [year, month]
    if (month == 13) arr = [year + 1, 1]
    if (month == 0) arr = [year - 1, 12]
    return arr.map(i => formatNum(i))
}

export const numberTimeToStr = (time: number | string): string => formatNum(+time) + ':00'

export const strToTimeNumber = (time: string): number => +(time.split(':')[0])

export const convertHexToAppColor = (hex: string) => {
    const color = Object.entries(taskColors).find(item => item[1].color.toLowerCase() == hex)
    if (color) return color[0]
    return ''
}

export const createThunk = createAsyncThunk.withTypes<{ state: StateType, dispatch: DispatchType }>()

export const cutString = (str: string, length: number = 16) =>
    str.length > length ? str.slice(0, length) + '...' : str

export const styledProps = (property: string) => (props: any) => props[property]

export const compareProps = (property: string, val1: string, val2: string) =>
    (props: any) => props[property] ? val1 : val2

export const isValidDate = (currentDate: nor, count: number, year: string,
                            month: string) => currentDate && +currentDate + count <
    createDaysAmount(year, month) + 1 && +currentDate + count > 0
