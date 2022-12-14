import {AnimationResult, Controller} from "@react-spring/web";

const Animations = {
    scale: (onRest: Function) => ({
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
        onRest: (result: any, spring: any, item: any) => {
            if (!item) onRest()
        }
    }),
    widthOpacity: () => ({
        from: {
            width: 0,
            opacity: 0
        },
        enter: {
            width: 900,
            opacity: 1
        },
        leave: {
            width: 0,
            opacity: 0
        }
    }),
    modalError: (style: any) => ({
        start: {
            translate: 0,
            config: {
                duration: 100
            },
            backgroundColor: 'white'
        }
        , api: {
            to: [{translate: 20}, {
                translate: -20,
                backgroundColor: '#f7eded'
            }, {translate: 0, backgroundColor: 'white'}]
        },
        transformHandler: (value: any) => {
            const transform = style.transform == 'none' ? '' : style.transform
            return `translate(${value}px) ${transform}`
        }
    }),
    infoModal: (onRest: Function) => ({
        from: {
            y: 100,
            opacity: 0,
        },
        enter: {
            scale: 1,
            y: 0,
            opacity: 1,
        },
        leave: {
            y: 100,
            opacity: 0,
        },
        onRest: (result: AnimationResult, spring: Controller, item: boolean) => {
            if (!item) onRest()
        }
    })

}

export default Animations
