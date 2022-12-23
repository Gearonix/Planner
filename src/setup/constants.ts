import {LinearProgressProps} from "@mui/material";

export const STATUS = {
    ok: 200,
    serverError: 500
}

export const FILES_LOCATION = 'http://localhost:6868/static/'

export const WEEKDAYS = ['sun', 'mon', 'tue', 'wen', 'thu', 'fri', 'sat']

export const MONTHS = ['January', 'February', 'March', 'April', 'May',
    'June', 'July', 'August', 'September',
    'October', 'November', 'December']

interface TaskColorsType {
    [index: string]: {
        background: string, color: string,
        muiColor: LinearProgressProps['color']
    }
}

export const taskColors: TaskColorsType = {
    yellow: {background: '#FEF9C3', color: '#CA8A04', muiColor: 'warning'},
    green: {background: '#DCFCE7', color: '#16A34A', muiColor: 'success'},
    blue: {background: '#DBEAFE', color: '#2563EB', muiColor: 'info'},
    red: {background: '#FEE2E2', color: '#DC2626', muiColor: 'error'},
    grey: {background: '#F3F4F6', color: '#475569', muiColor: 'inherit'},
}

export const DATE_FORMAT = 'YYYY-MM-DD'


export const repetitionDelays = ['single', 'daily', 'weekly', 'monthly', 'annually']

export const devices = {
    mobileS: `(max-width: 320px)`,
    mobileM: `(max-width: 375px)`,
    mobileL: `(max-width: 573px)`,
    mobileXL: `(max-width: 638px)`,
    tablet: `(max-width: 830px)`,
    laptopXS: `(max-width: 1124px)`,
    laptopS: `(max-width: 1250px)`,
    laptopM: `(max-width: 1490px)`,
    laptopL: `(max-width: 1664px)`,
    laptopXL: `(max-width: 1890px)`,
    desktop: `(max-width: 2560px)`,
};

export const github = 'https://github.com/Gearonix/Planner'
