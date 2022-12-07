export const STATUS = {
    ok : 200,
    serverError : 500
}
export const isError = (data : any) => data.status==STATUS.serverError

export const FILES_LOCATION = 'http://localhost:6868/static/'

export const WEEKDAYS =  ['sun','mon','tue','wen','thu','fri','sat']

export const MONTHS = ['January', 'February', 'March', 'April', 'May',
    'June', 'July', 'August', 'September',
    'October', 'November', 'December']

export const taskColors = {
    yellow : {background : '#FEF9C3', color : '#CA8A04'},
    green : {background : '#DCFCE7', color : '#16A34A'},
    blue : {background : '#DBEAFE', color : '#2563EB'},
    red : {background : '#FEE2E2', color : '#DC2626'},
    grey : {background : '#F3F4F6', color : '#475569'},
}

export const repetitionDelays = ['single','daily','weekly','monthly','annually']
