import React, {useEffect} from 'react'
import {SpaceBackground} from "../others/SpaceBackground/spaceBackground";
import {NavLink, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import Selectors from "../../helpers/selectors";
import {AboutBlock, BackIcon, DeviceError, GitIcon, IconsBlock, Info, Title} from './About.styles';
import {BsCalendar3} from "react-icons/bs";
import {FaNodeJs, FaReact} from 'react-icons/fa'
import {SiExpress, SiGithub, SiMongodb, SiRedux, SiTypescript} from 'react-icons/si';
import {MdArrowBackIosNew} from 'react-icons/md'
import Link from '@mui/material/Link';
import {animated, useSpring} from "@react-spring/web";
import Animations from '../../helpers/animations';
import {isItLaptop} from "../../utils/tools";
import {github} from '../../setup/constants';
import {useTranslation} from "react-i18next";

export const About = () => {
    const navigate = useNavigate()
    const user_id = useSelector(Selectors.userId)
    useEffect(() => {
        if (!user_id) navigate('/login')
    }, [user_id])
    const {t} = useTranslation()

    const [animation, api] = useSpring(Animations.aboutPage().start, [])
    setTimeout(() => api.start(Animations.aboutPage().api), 500)

    return <SpaceBackground>
        <AboutBlock style={animation} as={animated.div}>
            <Title><BsCalendar3 style={{marginRight: 8}}/>{t('spaceCalendar')}</Title>
            <Info>
                Space Calendar {t('aboutText')} <br/>
                {t('technologyStack')} <br/>
            </Info>
            <IconsBlock>
                <FaReact style={{color: '#61dafb'}}/>
                <SiRedux style={{color: '#764abc'}}/>
                <SiTypescript style={{color: '#3178c6'}}/>
                <FaNodeJs style={{color: '#026e00'}}/>
                <SiExpress style={{color: 'white'}}/>
                <SiMongodb style={{color: 'rgb(17, 97, 73)'}}/>
            </IconsBlock>
            {isItLaptop() && <DeviceError>
                {t('aboutError')}
            </DeviceError>
            }

            <Info>{t('sourcesCanBeFound')}
                <Link href={github} target='_blank'> {t('here')}</Link></Info>
            <GitIcon href={github} target='_blank'><SiGithub/></GitIcon>
            <NavLink to={'/'}>
                <BackIcon>
                    <MdArrowBackIosNew/>
                </BackIcon>
            </NavLink>

        </AboutBlock>
    </SpaceBackground>
}


export default About
