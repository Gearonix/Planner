import styled from "styled-components";
import {CellTask, MonthBlock} from "../MonthCalendar/monthCalendar.styles";

export const DayCalendarMain = styled(MonthBlock)`
  width: 60%;
  height: 900px;
  position: absolute;
  background: white;
`

export const DayCalendarInner = styled.div`
  width: 100%;
  height: 100%;

`


export const DayList = styled.div`
  border: 1px solid #d9d9d9;
  width: 90%;
  margin: 0 auto;
  margin-top: 15px;
  border-radius: 4px;
  height: 700px;
  overflow-y: auto;
  overflow-x: hidden;

  &::-webkit-scrollbar-thumb {
    border: 5px solid transparent;
    border-radius: 100px;
    background-color: white;
    background-clip: content-box;
  }

  &::-webkit-scrollbar-track {
    background-color: #e4e4e4;
    border-radius: 100px;
  }
  &::-webkit-scrollbar{
    width: 16px;
  }
  position: relative;
`

export const HoursContainer = styled.div`
  width: 95%;
  margin: 0 auto;
  position: relative;
  cursor: pointer;
`

export const HourBlock = styled.div`
  height: 80px;
  width: 100%;
  border-bottom: 1px solid #d9d9d9;
  margin-top: 10px;
  margin-bottom: 0;
`
export const HourTime = styled.h4`
  color: #424242;
  font-weight: normal;
  font-size: 15px;
  margin: 0;
`
export const DayTask = styled(CellTask)`
  position: absolute;
  right: 0;
  margin-top: 0;
  margin-bottom: 0;
  border: none;
  width: 95%;
  border-radius: 15px;
  height: ${({length} : {length : number,top : number}) => length * 91}px;
  top: ${({top} : {length : number,top : number}) => top * 91 - 10}px;
  display: block;

`
export const DayTaskTitle = styled.h2`
  margin-top: 10px;
  margin-left: 10px;
  font-size: 20px;
  margin-bottom: 0;
`
export const DayTaskTimeRange =  styled.h3`
  font-size: 17px;
  margin-left: 10px;
  margin-top: 2px;
  font-weight: normal;
`
export const DayTaskImage = styled.img`
  width: 75%;
  height: 70%;
  right: 0;
  top: 0;
  position: absolute;
  object-fit: cover;
  border-radius: 20px;
  
`
