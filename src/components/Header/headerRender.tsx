import React from 'react'
import {
    ArrowIconWrapper,
    ArrowsBlock,
    HeaderElement,
    IconWrapper,
    Logo,
    LogoText,
    RangeDropDown,
    SettingsBlock,
    TodayButton,
    TodayTitle
} from "./others/header.styles";
import {BsCalendar3} from "react-icons/bs";
import {IoIosArrowBack, IoIosArrowForward} from "react-icons/io";
import {FiSettings} from "react-icons/fi";
import {UserImage} from "../Profile/components";
import {HeaderRenderType} from './others/headerTypes';
import {DropDownC} from "../others/materialUI/datepicker";
import {convertToDayJs} from '../../utils/tools';
import {SiGithub} from "react-icons/si";
import {github} from '../../setup/constants';
import {useTranslation} from "react-i18next";
import {FaLanguage} from 'react-icons/fa'


const HeaderRender: React.FC<HeaderRenderType> = (props) => {
    const {
        toToday, switchDate, toAboutPage,
        switchRange, range, selectedDate, setIsProfile, changeLanguage
    } = props
    const {t} = useTranslation()
    const {year, date} = selectedDate

    const normalizeDate = (format: string) => t(convertToDayJs(selectedDate).format(format))
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
            {range === 'date' && date} {normalizeDate('MMMM')} {year}
            {range === 'date' && `, ${normalizeDate('dddd')}`}
        </TodayTitle>
        <SettingsBlock>
            <IconWrapper onClick={changeLanguage}>
                <FaLanguage/>
            </IconWrapper>
            <IconWrapper href={github} target='_blank'>
                <SiGithub/>
            </IconWrapper>
            <IconWrapper onClick={toAboutPage}>
                <FiSettings/>
            </IconWrapper>
            <DropDownC names={['date', 'month']} value={range}
                       handler={switchRange} Component={RangeDropDown}
                       minWidth={75}/>
            <UserImage size={40} fontSize={22} handler={() => setIsProfile(true)}/>
        </SettingsBlock>
    </HeaderElement>
}


export default HeaderRender
