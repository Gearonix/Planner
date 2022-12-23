import React, {useContext, useEffect} from "react";
import {MonthBlock} from "./monthCalendar.styles";
import {useDispatch, useSelector} from "react-redux";
import {actions, MainContext} from "../../utils/reducer";
import Selectors from "../../../../helpers/selectors";
import {Calendar} from 'antd';
import {Dayjs} from "dayjs";
import {CellRender} from "./utils";
import {DispatchType} from "../../../../setup/store";
import {setDate} from "../../../../setup/reducers/tasksListReducer";
import {convertToDate, convertToDayJs} from "../../../../utils/tools";
import ModalWrapper from "../../../others/Modals/modalWrapper/modalWrapper";


const MonthCalendar = () => {
    const daysData = useSelector(Selectors.daysData)
    const selectedDate = useSelector(Selectors.selectedDate)
    const dispatch = useDispatch<DispatchType>()

    const context = useContext(MainContext)
    const mainState = context.state


    useEffect(() => {
        if (mainState.range === 'date') {
            context.scrolls.toDay()
            context.closeModal()
        }
    }, [mainState.range])


    const clickToDay = (value: Dayjs) => {
        dispatch(setDate(convertToDate(value)))
        context.dispatch(actions.switchRange('date'))
    }

    return <MonthBlock className={'draggableElement'}>
        {context.state.modalComponent === 'createModal' && <ModalWrapper/>}
        <Calendar dateCellRender={CellRender({daysData, selectedDate, filter: mainState.filter})}
                  onSelect={clickToDay} headerRender={() => null}
                  value={convertToDayJs(selectedDate)}/>;
    </MonthBlock>

}


export default MonthCalendar
