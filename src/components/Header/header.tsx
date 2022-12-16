import React, {useContext} from 'react'
import {
    BurgerIconWrapper,
    BurgerWrapper,
    HeaderElement,
    Logo,
    SettingsBlock,
    SettingsIconWrapper,
    TodayButton,
    TodayTitle
} from './header.styles'
import {RxHamburgerMenu} from 'react-icons/rx'
import {useSelector} from "react-redux";
import {toMonthName} from '../../helpers/tools';
import {FiSettings} from 'react-icons/fi'
import {actions, MainContext} from "../Main/reducer";
import Selectors from "../../helpers/selectors";
import {UserImage} from "../Profile/components";

const Header = () => {
    const {year, month, date} = useSelector(Selectors.current)
    const context = useContext(MainContext)

    return <HeaderElement>
        <Logo>Gearonix</Logo>
        <BurgerWrapper onClick={() => context.dispatch(actions.setIsAsideOpened(!context.state.isAsideOpened))}>
            <BurgerIconWrapper>
                <RxHamburgerMenu/>
            </BurgerIconWrapper>
        </BurgerWrapper>
        <TodayButton onClick={() => {
            context.scrolls[1]()
            context.toToday()
            context.dispatch(actions.openProfile(false))
        }}>
            Today
        </TodayButton>
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
