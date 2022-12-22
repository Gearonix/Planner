import sprites from '../../../assets/index'
import React from "react";
import {animated, useSpring} from "@react-spring/web";
import Animations from "../../../helpers/animations";
import {Cloud, Earth, PageContainer, RockObject} from './spaceBackground.styles';


const cloudSizes = [120, 150, 170, 140, 60, 60, 120, 120, 60]

const coords = {
    clouds: [[10, 25], [22, 70], [80, 25],
        [35, 7], [40, 7], [34, 40], [60, 50],
        [65, 20], [70, 20]],
    rocks: [[3, 2.45], [2.3, 2], [8, 6],
        [3, 7], [1.3, 1], [1, 3], [8, 2],
        [2, 1]]
}

export const SpaceBackground = ({children}: any) => {
    return <PageContainer>
        {sprites.rocks.map((img, idx) => <Rock src={img} idx={idx} key={idx}/>)}
        {cloudSizes.map((size, idx) => <Cloud src={sprites.cloudImg}
                                              coords={coords.clouds[idx]} size={size}
                                              key={idx}/>)}
        <Earth src={sprites.earthImg}/>
        {children}
    </PageContainer>
}


const Rock = ({src, idx}: { src: any, idx: number }) => {
    const animations = useSpring(Animations.rock(coords.rocks[idx]))
    return <RockObject src={src} style={animations} as={animated.img}/>
}


