import React, {useContext} from 'react'
import {
    ArrowIconWrapper,
    ArrowsBlock,
    BurgerIconWrapper,
    BurgerWrapper,
    HeaderElement,
    Logo,
    LogoText,
    RangeDropDown,
    SettingsBlock,
    SettingsIconWrapper,
    TodayButton,
    TodayTitle
} from './header.styles'
import {useDispatch, useSelector} from "react-redux";
import {formatNum, isValidDate, toMonthName, ValidateMonthChange} from '../../helpers/tools';
import {FiSettings} from 'react-icons/fi'
import {actions, MainContext} from "../Main/reducer";
import Selectors from "../../helpers/selectors";
import {UserImage} from "../Profile/components";
import {BsCalendar3} from 'react-icons/bs'
import {IoIosArrowBack, IoIosArrowForward} from "react-icons/io";
import {DropDownC} from '../others/components';
import {RxHamburgerMenu} from 'react-icons/rx'
import {componentNameT} from "../../global/types/components/mainTypes";
import {clearCurrentData, setCurrentData, setUserDays} from "../../reducers/tasksListReducer";
import {DispatchType} from '../../global/store';
import {useNavigate} from "react-router-dom";

const Header = () => {
    const current = useSelector(Selectors.current)
    const tasklists = useSelector(Selectors.taskLists)
    const user_id = useSelector(Selectors.userId)
    const {month, year} = tasklists
    const {date: currentDate} = current
    const context = useContext(MainContext)
    const navigate = useNavigate()


    const dispatch = useDispatch<DispatchType>()
    const component = context.state.componentName
    const switchRange = (value: componentNameT) => {
        context.dispatch(actions.openComponent(value))
        if (value == 'day') {
            if (component == 'day') return
            context.dispatch(actions.closeModal())
            context.dispatch(actions.setIndex(null))
            const fulldate = `${tasklists.year}-${tasklists.month}-${formatNum(+tasklists.date)}`
            dispatch(setCurrentData({user_id, fulldate}))
            context.scrolls[1]()
            return
        }
        context.dispatch(actions.closeModal())
        context.dispatch(actions.setIndex(null))
        dispatch(clearCurrentData())
        context.scrolls[0]()
    }

    const switchDate = (count: -1 | 1) => {
        if (component == 'day' && !isValidDate(currentDate, count, year, month)) return
        context.dispatch(actions.closeModal())
        context.dispatch(actions.setIndex(null))

        const isDayElement = component == 'day' && isValidDate(currentDate, count, year, month)

        const [selectedYear, selectedMonth] =
            isDayElement ? [year, month] : ValidateMonthChange(+year, +month + count)
        // @ts-ignore
        const selectedDate: string = isDayElement ? formatNum(+currentDate + count) : currentDate || '01'
        const fulldate = `${selectedYear}-${selectedMonth}-${selectedDate}`


        const callback = isDayElement ? setCurrentData : setUserDays
        setTimeout(() => dispatch(callback({user_id, fulldate, noCurrent: !isDayElement})), 200)

        // animation(count)

    }

    return <HeaderElement>
        <Logo>
            <BsCalendar3/>
        </Logo>
        <LogoText>Space Calendar</LogoText>
        <BurgerWrapper onClick={() => context.dispatch(actions.setIsAsideOpened(!context.state.isAsideOpened))}>
            <BurgerIconWrapper>
                <RxHamburgerMenu/>
            </BurgerIconWrapper>
        </BurgerWrapper>

        <TodayButton onClick={() => {
            context.scrolls[1]()
            context.toToday()
            context.dispatch(actions.openComponent('day'))
        }}>Today</TodayButton>

        <ArrowsBlock>
            <ArrowIconWrapper onClick={() => switchDate(-1)}>
                <IoIosArrowBack/>
            </ArrowIconWrapper>
            <ArrowIconWrapper onClick={() => switchDate(1)}>
                <IoIosArrowForward/>
            </ArrowIconWrapper>
        </ArrowsBlock>
        <TodayTitle>
            {current.date} {toMonthName(current.month || '')} {current.year}
        </TodayTitle>
        <SettingsBlock>
            <SettingsIconWrapper onClick={() => navigate('/about')}>
                <FiSettings/>
            </SettingsIconWrapper>
            <DropDownC names={['day', 'month']} value={component}
                       handler={switchRange} Component={RangeDropDown}
                       minWidth={75}/>
            <UserImage size={40} fontSize={22} handler={() =>
                context.dispatch(actions.openComponent('profile'))}/>
        </SettingsBlock>

    </HeaderElement>
}


export default Header
