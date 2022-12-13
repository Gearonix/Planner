import {AnimationResult, Controller} from "@react-spring/web";

const Animations = {
    scale: (close: Function) => ({
        from: {
            scale: 0,
            opacity: 0,
        },
        enter: {
            scale: 1,
            opacity: 1,
        },
        leave: {
            scale: 0,
            opacity: 0,

        },
        onRest: (result: AnimationResult, spring: Controller, item: boolean) => {
            if (!item) close()
        }
    })
}

export default Animations
