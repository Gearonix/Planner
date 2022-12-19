import React, {useContext} from 'react'
import {
    ArrowIconWrapper,
    ArrowsBlock,
    HeaderElement,
    Logo,
    LogoText,
    SettingsBlock,
    SettingsIconWrapper,
    TodayButton,
    TodayTitle
} from './header.styles'
import {useSelector} from "react-redux";
import {toMonthName} from '../../helpers/tools';
import {FiSettings} from 'react-icons/fi'
import {actions, MainContext} from "../Main/reducer";
import Selectors from "../../helpers/selectors";
import {UserImage} from "../Profile/components";
import {BsCalendar3} from 'react-icons/bs'
import {IoIosArrowBack, IoIosArrowForward} from "react-icons/io";


const Header = () => {
    const {year, month, date} = useSelector(Selectors.current)
    const context = useContext(MainContext)

    return <HeaderElement>
        {/*<Logo src={logoImg}/>*/}
        <Logo>
            <BsCalendar3/>
        </Logo>
        <LogoText>Space Calendar</LogoText>
        {/*<BurgerWrapper onClick={() => context.dispatch(actions.setIsAsideOpened(!context.state.isAsideOpened))}>*/}
        {/*    <BurgerIconWrapper>*/}
        {/*        <RxHamburgerMenu/>*/}
        {/*    </BurgerIconWrapper>*/}
        {/*</BurgerWrapper>*/}
        <TodayButton onClick={() => {
            context.scrolls[1]()
            context.toToday()
            context.dispatch(actions.openProfile(false))
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
            {date} {toMonthName(month || '')} {year}
        </TodayTitle>

        <SettingsBlock>
            <SettingsIconWrapper>
                <FiSettings/>
            </SettingsIconWrapper>
            <UserImage size={50} fontSize={22} handler={() =>
                context.dispatch(actions.openProfile(true))}/>
        </SettingsBlock>

    </HeaderElement>
}


export default Header
