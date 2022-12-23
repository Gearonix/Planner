import {RefObject} from "react";
import {IParallax} from "@react-spring/parallax";
import {taskColors} from "../../../setup/constants";

export const useScrolls = (parallax: RefObject<IParallax>) => {
    const toMonth = () => parallax?.current?.scrollTo(1)
    const toDay = () => parallax?.current?.scrollTo(0)
    return {
        toMonth: () => {
            document.removeEventListener('mousewheel', toDay)
            document.addEventListener('mousewheel', toMonth)
            parallax?.current?.scrollTo(1)
        },
        toDay: () => {
            document.removeEventListener('mousewheel', toMonth)
            document.addEventListener('mousewheel', toDay)
            parallax?.current?.scrollTo(0)
        }
    }
}
export const convertHexToAppColor = (hex: string) => {
    const color = Object.entries(taskColors).find(item => item[1].color.toLowerCase() === hex)
    if (color) return color[0]
    return ''
}


