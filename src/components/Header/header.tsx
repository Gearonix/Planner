import React from 'react'
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
import {StateType} from "../../global/store";
import {useDispatch, useSelector} from "react-redux";
import {toMonthName} from '../../helpers/tools';
import {BsSearch} from 'react-icons/bs'
import {FiSettings} from 'react-icons/fi'
import {UserImage} from '../Profile/profile'
import {Link} from "react-router-dom";
import {mainStatesT} from "../Main/main";

type headerProps = {
    closeAside: () => void,
    states: mainStatesT
}


const Header = ({closeAside, states}: headerProps) => {
    const {year, month, date} =
        useSelector((state: StateType) => state.taskLists.current)
    const {component: [componentName, openComponent], index: [componentIndex, setIndex]} = states
    const user_id = useSelector((state: StateType) => state.userData.user_id) || ''
    const {year: currentYear, month: currentMonth} = useSelector((state: StateType) => state.taskLists)
    const dispatch = useDispatch()
    return <HeaderElement>
        <Logo>Gearonix</Logo>
        <BurgerWrapper onClick={closeAside}>
            <BurgerIconWrapper>
                <RxHamburgerMenu/>
            </BurgerIconWrapper>
        </BurgerWrapper>
        <TodayButton>
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
