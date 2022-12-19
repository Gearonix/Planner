import {IParallax} from "@react-spring/parallax";
import {RefObject} from "react";

export const useScrolls = (parallax: RefObject<IParallax>) => {
    const toMonth = () => parallax?.current?.scrollTo(1)
    const toDay = () => parallax?.current?.scrollTo(0)
    return [() => {
        document.removeEventListener('mousewheel', toDay)
        document.addEventListener('mousewheel', toMonth)
        parallax?.current?.scrollTo(1)
    },
        () => {
            document.removeEventListener('mousewheel', toMonth)
            document.addEventListener('mousewheel', toDay)
            parallax?.current?.scrollTo(0)
        }
    ]
}
