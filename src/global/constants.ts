export const STATUS = {
    ok : 200,
    serverError : 500
}
export const isError = (data : any) => data.status==STATUS.serverError

export const FILES_LOCATION = 'http://localhost:6868/static/'

export const weekDays =  ['sun','mon','true','wen','thu','fri','sat']
