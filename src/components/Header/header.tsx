import React, {useContext, useState} from 'react'
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
import {formatNum, toMonthName} from '../../helpers/tools';
import {FiSettings} from 'react-icons/fi'
import {actions, MainContext} from "../Main/reducer";
import Selectors from "../../helpers/selectors";
import {UserImage} from "../Profile/components";
import {BsCalendar3} from 'react-icons/bs'
import {IoIosArrowBack, IoIosArrowForward} from "react-icons/io";
import {DropDownC} from '../others/components';
import {RxHamburgerMenu} from 'react-icons/rx'
import {componentNameT} from "../../global/types/components/mainTypes";
import {clearCurrentData, setCurrentData} from "../../reducers/tasksListReducer";
import {DispatchType} from '../../global/store';

const Header = () => {
    const current = useSelector(Selectors.current)
    const tasklists = useSelector(Selectors.taskLists)
    const context = useContext(MainContext)
    const user_id = useSelector(Selectors.userId)
    const dispatch = useDispatch<DispatchType>()
    const [calendarRange, setRange] = useState<componentNameT>('day')
    const switchRange = (value: componentNameT) => {
        context.dispatch(actions.openComponent(value))
        setRange(value)
        if (value == 'day') {
            context.dispatch(actions.closeComponent())
            context.dispatch(actions.setIndex(null))
            const fulldate = `${tasklists.year}-${tasklists.month}-${formatNum(+tasklists.date)}`
            dispatch(setCurrentData({user_id, fulldate}))
            context.scrolls[1]()
            return
        }
        context.dispatch(actions.closeComponent())
        context.dispatch(actions.setIndex(null))
        dispatch(clearCurrentData())
        context.scrolls[0]()
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
            <ArrowIconWrapper>
                <IoIosArrowBack/>
            </ArrowIconWrapper>
            <ArrowIconWrapper>
                <IoIosArrowForward/>
            </ArrowIconWrapper>
        </ArrowsBlock>
        <TodayTitle>
            {current.date} {toMonthName(current.month || '')} {current.year}
        </TodayTitle>
        <SettingsBlock>
            <SettingsIconWrapper>
                <FiSettings/>
            </SettingsIconWrapper>
            <DropDownC names={['day', 'month']} value={calendarRange}
                       handler={switchRange} Component={RangeDropDown}
                       minWidth={75}/>
            <UserImage size={40} fontSize={22} handler={() =>
                context.dispatch(actions.openComponent('profile'))}/>
        </SettingsBlock>

    </HeaderElement>
}


export default Header
