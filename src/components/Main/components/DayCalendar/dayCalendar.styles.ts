import styled from "styled-components";
import {CellTask, MonthBlock} from "../MonthCalendar/monthCalendar.styles";

export const DayCalendarMain = styled(MonthBlock)`
  width: calc(100% - 250px);
  height: 100%;
  position: absolute;
  background: #242526;
  margin: 0;
  opacity: 0.98;
  margin-left: 250px;
`

export const DayCalendarInner = styled.div`
  width: 100%;
  height: 100%;
`


export const DayList = styled.div`
  width: 99%;
  margin: 15px auto 0 auto;
  border-radius: 4px;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  background: #242526;

  &::-webkit-scrollbar-thumb {
    border: 5px solid transparent;
    border-radius: 100px;
    background-color: white;
    background-clip: content-box;
  }

  &::-webkit-scrollbar-track {
    border-radius: 100px;
  }

  &::-webkit-scrollbar {
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
  color: #e3e3e3;
  font-weight: normal;
  font-size: 15px;
  margin: 0;
`

type DayTaskProps = { length: number, top: number, isTask: boolean }

export const DayTask = styled(CellTask)`
  position: absolute;
  right: 0;
  margin-top: 0;
  margin-bottom: 0;
  border: none;
  box-sizing: border-box;
  width: 98%;
  border-radius: 15px;
  height: ${({length}: DayTaskProps) => length * 91}px;
  top: ${({top}: DayTaskProps) => top * 91 - 10}px;
  display: block;
  background: ${(props: any) => !props.isTask ? '#61dafb' : props.theme.background};
  color: ${(props: any) => !props.isTask ? '#16181D' : props.theme.color} !important;
`
export const DayTaskTitle = styled.h2`
  margin-top: 10px;
  margin-left: 10px;
  font-size: 20px;
  margin-bottom: 0;
`
export const DayTaskTimeRange = styled.h3`
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
