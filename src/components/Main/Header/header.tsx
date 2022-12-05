import React from 'react'
import {BurgerWrapper, HeaderElement, BurgerIconWrapper,
    Logo, TodayButton, TodayTitle, ArrowIconWrapper,
    SearchInput, SearchInputWrapper, SearchIconWrapper,
    SettingsBlock, SettingsIconWrapper } from './header.styles'
import {RxHamburgerMenu} from 'react-icons/rx'
import {StateType} from "../../../global/store";
import {useSelector} from "react-redux";
import { toMonthName } from '../../../global/tools';
import {BsArrowLeftSquare,BsArrowRightSquare
,BsSearch} from 'react-icons/bs'
import {FiSettings} from 'react-icons/fi'
import {UserImage} from './../../Profile/profile'
import {Link} from "react-router-dom";

type headerProps = {
    closeAside : () => void
}


const Header = ({closeAside} : headerProps) => {
    const {year,month,date} =
    useSelector((state : StateType) => state.taskLists.current)
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
        <ArrowIconWrapper>
            <BsArrowLeftSquare/>
        </ArrowIconWrapper>
        <ArrowIconWrapper>
            <BsArrowRightSquare/>
        </ArrowIconWrapper>
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
