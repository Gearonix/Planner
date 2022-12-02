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

export const createDateData = (user_id : string,fulltime ?: string | null) => {
    if (fulltime){
        const [year,month,day] = fulltime.split('-')
        const weekDay = formatWeekDay(new Date(+year,+month,+day).getDay())
        return {
            date : day,month,year,weekDay,user_id,
            tasklist : [],_id : null
        }
    }
    const date = new Date()
    let day = normalizeNumber(date.getDate())
    let month = normalizeNumber(date.getMonth())
    let year = normalizeNumber(date.getFullYear())
    const weekDay = formatWeekDay(date.getDay())
    return  {
        date : day,month,year,weekDay,user_id,
        tasklist : [],_id : null
    }
}

export const generateMonth = (month : number) => {
    return month + 1 == 13 ? 1 : month + 1
}

export const createDaysAmount = (year : string,month : string) => {
    const date = new Date(+year , parseInt(month) + 1, 0);
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

export const getCurrentMonth = () => normalizeNumber(new Date().getMonth())

export const getCurrentYear = () => new Date().getFullYear().toString()

export const convertPromise = (state : any) => JSON.parse(JSON.stringify(state));
