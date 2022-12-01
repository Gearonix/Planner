export const capitalizeFirstLetter = (word : string) => word[0].toUpperCase() + word.slice(1)

export const randomizeColors = () => {
    const colors = ['#FF6978','#B2F793',
        '#7AD9FF','#F5EEAE','#D090FF']
    return colors[Math.floor(Math.random() * colors.length)]
}
