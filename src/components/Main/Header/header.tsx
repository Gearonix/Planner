import React from 'react'
import {BurgerWrapper, HeaderElement, BurgerIconWrapper,
    Logo, TodayButton, TodayTitle, ArrowIconWrapper,
    SearchInput, SearchInputWrapper, SearchIconWrapper,
    SettingsBlock, SettingsIconWrapper } from './header.styles'
import {RxHamburgerMenu} from 'react-icons/rx'
import {StateType} from "../../../global/store";
import {useDispatch, useSelector} from "react-redux";
import {generateTodayDate, stringToTime, toMonthName} from '../../../global/tools';
import {BsArrowLeftSquare,BsArrowRightSquare
,BsSearch} from 'react-icons/bs'
import {FiSettings} from 'react-icons/fi'
import {UserImage} from './../../Profile/profile'
import {Link} from "react-router-dom";
import {setCurrentData, setUserDays} from "../../../reducers/tasksListReducer";

type headerProps = {
    closeAside : () => void,
    toToday : () => void
}


const Header = ({closeAside,toToday} : headerProps) => {
    const {year,month,date} =
    useSelector((state : StateType) => state.taskLists.current)
    const user_id = useSelector((state: StateType) => state.userData.user_id) || ''
    const {year : currentYear,month : currentMonth} = useSelector((state: StateType) => state.taskLists)
    const dispatch = useDispatch()
    return <HeaderElement>
        <Logo>Gearonix</Logo>
        <BurgerWrapper onClick={closeAside}>
            <BurgerIconWrapper>
                <RxHamburgerMenu/>
            </BurgerIconWrapper>
        </BurgerWrapper>
        <TodayButton onClick={toToday}>
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
