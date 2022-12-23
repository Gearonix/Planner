import React from 'react'
import {
    ArrowIconWrapper,
    ArrowsBlock,
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
import {IoIosArrowBack, IoIosArrowForward} from "react-icons/io";
import {FiSettings} from "react-icons/fi";
import {UserImage} from "../Profile/components";
import {HeaderRenderType} from './others/headerTypes';
import {DropDownC} from "../others/materialUI/datepicker";
import {toMonthName} from '../../utils/tools';
import {SiGithub} from "react-icons/si";
import {github} from '../../setup/constants';
import {useTranslation} from "react-i18next";


const HeaderRender: React.FC<HeaderRenderType> = (props) => {
    const {
        toToday, switchDate, toAboutPage,
        switchRange, range, selectedDate, setIsProfile
    } = props
    const {t} = useTranslation()
    const {year, month, date} = selectedDate
    return <HeaderElement>
        <Logo>
            <BsCalendar3/>
        </Logo>
        <LogoText>Space Calendar</LogoText>

        <TodayButton onClick={toToday}>{t('today')}</TodayButton>

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
            <SettingsIconWrapper href={github} target='_blank'>
                <SiGithub/>
            </SettingsIconWrapper>
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
