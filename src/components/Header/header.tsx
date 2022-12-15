import React, {useContext} from 'react'
import {
    BurgerIconWrapper,
    BurgerWrapper,
    HeaderElement,
    Logo,
    SearchIconWrapper,
    SearchInput,
    SearchInputWrapper,
    SettingsBlock,
    SettingsIconWrapper,
    TodayButton,
    TodayTitle
} from './header.styles'
import {RxHamburgerMenu} from 'react-icons/rx'
import {useSelector} from "react-redux";
import {toMonthName} from '../../helpers/tools';
import {BsSearch} from 'react-icons/bs'
import {FiSettings} from 'react-icons/fi'
import {UserImage} from '../Profile/profile'
import {Link} from "react-router-dom";
import {actions, MainContext} from "../Main/reducer";
import Selectors from "../../helpers/selectors";

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
        }}>
            Today
        </TodayButton>
        <TodayTitle>
            {date} {toMonthName(month || '')} {year}
        </TodayTitle>
        <SearchInputWrapper>
            <SearchInput placeholder={'Search'}/>
            <SearchIconWrapper>
                <BsSearch/>
            </SearchIconWrapper>
        </SearchInputWrapper>

        <SettingsBlock>
            <SettingsIconWrapper>
                <FiSettings/>
            </SettingsIconWrapper>
            <Link to={'/users/me'} style={{textDecoration : 'none'}}>
                <UserImage size={50} fontSize={22}/>
            </Link>
        </SettingsBlock>

    </HeaderElement>
}


export default Header
