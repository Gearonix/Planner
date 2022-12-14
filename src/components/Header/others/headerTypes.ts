import {componentNameT, selectedDateT} from "../../Main/others/mainTypes";

export type HeaderRenderType = {
    toToday: () => void,
    switchDate: (direction: 1 | -1) => void,
    toAboutPage: () => void,
    switchRange: (range: componentNameT) => void,
    range: componentNameT,
    selectedDate: selectedDateT,
    setIsProfile: (bool: boolean) => void,
    changeLanguage: () => void
}
