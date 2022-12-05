export const STATUS = {
    ok : 200,
    serverError : 500
}
export const isError = (data : any) => data.status==STATUS.serverError

export const FILES_LOCATION = 'http://localhost:6868/static/'

export const WEEKDAYS =  ['sun','mon','true','wen','thu','fri','sat']

export const MONTHS = ['January', 'February', 'March', 'April', 'May',
    'June', 'July', 'August', 'September',
    'October', 'November', 'December']
