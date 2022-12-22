import {AnimationResult, Controller} from "@react-spring/web";
import {randomizeNumber} from "../utils/tools";

const Animations = {
    scale: (onRest: Function) => ({
        from: {
            scale: 0,
            opacity: 0,
        },
        enter: {
            scale: 1,
            opacity: 1,
            config: {
                duration: 400
            }
        },
        leave: {
            scale: 0,
            opacity: 0,
            config: {
                duration: 400
            }
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
            width: 96,
            opacity: 1
        },
        leave: {
            width: 0,
            opacity: 0
        }
    }),
    opacity: (onRest: Function) => ({
        from: {
            opacity: 0
        },
        enter: {
            opacity: 1
        },
        leave: {
            opacity: 0
        },
        onRest: (result: any, spring: any, item: any) => {
            if (!item) onRest()
        }
    }),
    deleteTask: {
        start: {
            from: {
                opacity: 1,
                width: 96
            }
        },
        api: (callback: () => void) => ({
            to: [{
                width: 0,
                opacity: 0,
                config: {
                    duration: 500
                },
                onRest: ({finished}: AnimationResult) => {
                    if (finished) callback()
                }
            },
                {
                    opacity: 1,
                    width: 96,
                    config: {
                        duration: 0
                    }
                }
            ],


        })
    },
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
            const transform = style.transform === 'none' ? '' : style.transform
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
            config: {
                duration: 400
            }
        },
        leave: {
            y: 100,
            opacity: 0,
            config: {
                duration: 400
            },
        },
        onRest: (result: AnimationResult, spring: Controller, item: boolean) => {
            if (!item) onRest()
        }
    }),
    parallax: () => ({mass: 1, tension: 380, friction: 60}),
    opacityMoves: {
        start: {
            from: {
                opacity: 1,
                x: 0,
            }
        },
        animate: (onRest: () => void) => ({
            to: [{
                opacity: 0.3,
                x: -20,
                config: {
                    duration: 100
                }
            }, {
                opacity: 1,
                x: 0,
                config: {
                    duration: 100
                }
            }],
            onRest
        })
    },
    springOpacity: {
        from: {
            opacity: 0,
        },
        to: {
            opacity: 1,

        },
        config: {duration: 400}
    },
    rock: ([left, top]: Array<number>) => ({
        from: {
            x: Math.round(window.innerWidth / left) - 160,
            y: Math.round(window.innerHeight / top) - 160,
            rotate: 0
        },
        to: {
            x: randomizeNumber(-window.innerWidth, window.innerWidth),
            y: randomizeNumber(-window.innerHeight, window.innerHeight),
            rotate: 360
        },
        config: {
            duration: 4e5,
        }
    }),
    aboutPage: () => ({
        start: {
            from: {
                height: 0
            },
        },
        api: {
            to: {
                height: 500
            },
        }
    })
}

export default Animations
