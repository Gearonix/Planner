export const STATUS = {
    ok : 200,
    serverError : 500
}
export const isError = (data : any) => data.status==STATUS.serverError

export const FILES_LOCATION = 'http://localhost:6868/static/'
