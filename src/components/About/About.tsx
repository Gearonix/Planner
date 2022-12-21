import React from 'react'
import {SpaceBackground} from "../others/SpaceBackground/spaceBackground";
import {NavLink, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import Selectors from "../../helpers/selectors";
import {AboutBlock, BackIcon, GitIcon, IconsBlock, Info, Title} from './About.styles';
import {BsCalendar3} from "react-icons/bs";
import {FaNodeJs, FaReact} from 'react-icons/fa'
import {SiExpress, SiGithub, SiMongodb, SiRedux, SiTypescript} from 'react-icons/si';
import {MdArrowBackIosNew} from 'react-icons/md'
import Link from '@mui/material/Link';
import {animated, useSpring} from "@react-spring/web";
import Animations from '../../helpers/animations';

export const About = () => {
    const navigate = useNavigate()
    const user_id = useSelector(Selectors.userId)
    const github = 'https://github.com/Gearonix/Planner'
    if (!user_id) navigate('/login')
    const [animation, api] = useSpring(Animations.aboutPage().start, [])
    setTimeout(() => api.start(Animations.aboutPage().api), 500)

    return <SpaceBackground>
        <AboutBlock style={animation} as={animated.div}>
            <Title><BsCalendar3 style={{marginRight: 8}}/> Space Calendar</Title>
            <Info>
                Space Calendar is a project made by me in 2022. <br/>
                Technology stack: <br/>
            </Info>
            <IconsBlock>
                <FaReact style={{color: '#61dafb'}}/>
                <SiRedux style={{color: '#764abc'}}/>
                <SiTypescript style={{color: '#3178c6'}}/>
                <FaNodeJs style={{color: '#026e00'}}/>
                <SiExpress style={{color: 'white'}}/>
                <SiMongodb style={{color: 'rgb(17, 97, 73)'}}/>
            </IconsBlock>
            <Info>Sources can be found
                <Link href={github} target='_blank'> here</Link></Info>
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
