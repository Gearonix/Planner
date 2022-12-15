import {useDispatch, useSelector} from "react-redux";
import {createDaysAmount, formatNum, timeToString, toMonthName, ValidateMonthChange} from "../../../helpers/tools";
import {setCurrentData, setUserDays} from "../../../reducers/tasksListReducer";
import {
    ArrowDownWrap,
    CurrentDate,
    Grey,
    HeaderInfoWrapper,
    MonthArrow,
    MonthHeader,
    SortText,
    TodayButton
} from "../../Main/MonthCalendar/monthCalendar.styles";
import {IoIosArrowBack, IoIosArrowDown, IoIosArrowForward, IoIosArrowUp} from "react-icons/io";
import React, {useContext} from "react";
import {MainContext} from "../../Main/reducer";
import Selectors from "../../../helpers/selectors";
import {DispatchType} from "../../../global/store";
import {CalendarHeaderProps} from "../../../global/types/components/mainTypes";


const CalendarHeaderC = ({
                             isDay, close, animation = () => {
    }
                         }: CalendarHeaderProps) => {
    const context = useContext(MainContext)
    const dispatch = useDispatch<DispatchType>()

    const {month, year} = useSelector(Selectors.taskLists)
    const {date: currentDate, weekDay} = useSelector(Selectors.current)
    const user_id = useSelector(Selectors.userId)

    const switchMonth = (count: -1 | 1) => {
        const [selectedYear, selectedMonth] = ValidateMonthChange(+year, +month + count)
        const fulldate = timeToString(selectedYear, selectedMonth, currentDate || '01')

        const isDayElement = isDay && currentDate && +currentDate + count <
            createDaysAmount(year, month) + 1 && +currentDate + count > 0

        if (isDayElement) {
            return dispatch(setCurrentData({
                user_id, fulldate:
                    timeToString(year, month, formatNum(+currentDate + count))
            }))
        }
        dispatch(setUserDays({user_id, fulldate, noCurrent: true}))
        animation(count)
    }

    return <MonthHeader width={isDay ? 25 : 17}>
    <HeaderInfoWrapper>
        <CurrentDate width={!isDay ? 160 : 100}>
    {currentDate ? weekDay
        + ' ' + +currentDate :
        toMonthName(month) + ' ' + year}
    </CurrentDate>
        <MonthArrow>
            <IoIosArrowBack onClick={() => switchMonth(-1)}/>
        </MonthArrow>
        <MonthArrow>
            <IoIosArrowForward onClick={() => switchMonth(1)}/>
        </MonthArrow>


    </HeaderInfoWrapper>
        <HeaderInfoWrapper>
            <TodayButton onClick={() => {
                context.toToday()
                context.scrolls[1]()
            }}>
                Today
            </TodayButton>
            <SortText onClick={() => close()}>
                Sort By: <Grey>{isDay ? 'Day' : 'Month'}</Grey>
            </SortText>
            <ArrowDownWrap>
                {!isDay ? <IoIosArrowDown/> : <IoIosArrowUp/>}
            </ArrowDownWrap>

        </HeaderInfoWrapper>
    </MonthHeader>

}

export default CalendarHeaderC
