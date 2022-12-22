import {ColorWrapper} from "../Modals/modalWrapper/createTaskModal/CreateModal.styles";
import {TwitterPicker} from "react-color";
import {taskColors} from "../../../setup/constants";
import {convertHexToAppColor} from "../../Main/utils/utils";

export const ColorPicker = ({handler, isDark = false}: { handler: Function, isDark?: boolean }) =>
    <ColorWrapper isDark={isDark}>
        <TwitterPicker colors={Object.values(taskColors).map(({color}) => color)}
                       onChangeComplete={({hex}: any) => handler(convertHexToAppColor(hex))}/>
    </ColorWrapper>
