import React from 'react'
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
} from "./others/header.styles";
import {BsCalendar3} from "react-icons/bs";
import {RxHamburgerMenu} from "react-icons/rx";
import {IoIosArrowBack, IoIosArrowForward} from "react-icons/io";
import {FiSettings} from "react-icons/fi";
import {UserImage} from "../Profile/components";
import {HeaderRenderType} from './others/headerTypes';
import {DropDownC} from "../others/materialUI/datepicker";
import {toMonthName} from '../../utils/tools';


const HeaderRender: React.FC<HeaderRenderType> = (props) => {
    const {
        openAside, toToday, switchDate, toAboutPage,
        switchRange, range, selectedDate, setIsProfile
    } = props
    const {year, month, date} = selectedDate
    return <HeaderElement>
        <Logo>
            <BsCalendar3/>
        </Logo>
        <LogoText>Space Calendar</LogoText>
        <BurgerWrapper onClick={openAside}>
            <BurgerIconWrapper>
                <RxHamburgerMenu/>
            </BurgerIconWrapper>
        </BurgerWrapper>

        <TodayButton onClick={toToday}>Today</TodayButton>

        <ArrowsBlock>
            <ArrowIconWrapper onClick={() => switchDate(-1)}>
                <IoIosArrowBack/>
            </ArrowIconWrapper>
            <ArrowIconWrapper onClick={() => switchDate(1)}>
                <IoIosArrowForward/>
            </ArrowIconWrapper>
        </ArrowsBlock>
        <TodayTitle>
            {range === 'date' && date} {toMonthName(month)} {year}
        </TodayTitle>
        <SettingsBlock>
            <SettingsIconWrapper onClick={toAboutPage}>
                <FiSettings/>
            </SettingsIconWrapper>
            <DropDownC names={['date', 'month']} value={range}
                       handler={switchRange} Component={RangeDropDown}
                       minWidth={75}/>
            <UserImage size={40} fontSize={22} handler={() => setIsProfile(true)}/>
        </SettingsBlock>
    </HeaderElement>
}


export default HeaderRender
