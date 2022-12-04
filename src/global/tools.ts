export const capitalizeFirstLetter = (word : string) => word[0].toUpperCase() + word.slice(1)

export const randomizeColors = () => {
    const colors = ['#FF6978','#B2F793',
        '#7AD9FF','#F5EEAE','#D090FF']
    return colors[Math.floor(Math.random() * colors.length)]
}
export const normalizeNumber = (number : number) => {
    return number.toString().length == 1 ? '0' + number : number.toString()
}
export const formatWeekDay = (day : number) => {
    const names = ['sun','mon','true','wen','thu','fri','sat']
    return names[day]
}



export const timeToString = (year : string,month : string,date : string) : string =>  [year,month,date].join('-')

export const stringToTime = (fulldate : string) => fulldate.split('-')

export const createDateData = (user_id : string,fulltime : string) => {
    const [year,month,day] = stringToTime(fulltime)
    const weekDay = formatWeekDay(new Date(+year,+month,+day).getDay())
    return {date : day,month,year,weekDay,user_id, tasklist : [],_id : null}
}



export const createDaysAmount = (year : string,month : string) => {
    const date = new Date(+year , parseInt(month), 0);
    return date.getDate()
}


export const generateCalendarArray = (weekDay : number,amount : number) => {
    const valuesArray = [7 - weekDay]
    while (true){
        const sum = valuesArray.reduce((a,b) => a + b,0)
        if (sum  + 7 >= amount) break
        valuesArray.push(7)

    }
    const sum = valuesArray.reduce((a,b) => a + b,0)
    valuesArray.push(amount - sum)
    return valuesArray
}
// @ts-ignore
export const getArrayByC = (count : number) => [...Array(count).keys()]

export const convertPromise = (state : any) => JSON.parse(JSON.stringify(state));

export const parseQuery = (query : string) => Object.fromEntries(query.slice(1).split('&')
    .map((str : string) => str.split('=')))

export const formatMonth = (month : number = new Date().getMonth()) =>  normalizeNumber(month + 1)
