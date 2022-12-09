import styled from 'styled-components'
import { AddButtonText } from '../../Aside/aside.styles'
import {ArrowIconWrapper} from "../../Header/header.styles";




export const MonthBlock = styled.div`
  background: white;
  padding-bottom: 15px;
  border-radius: 4px;
  margin-left: 15px;
  margin-top: 15px;
  width: 1550px;

`
export const MonthHeader = styled.div`
  width: 100%;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  & > div{
    width: ${(props : { width : number }) => props.width }%;
  }
`
export const CurrentDate = styled(AddButtonText)`
 
  font-weight: normal;
  margin: 0;
  font-family: 'Barlow Semi Condensed', sans-serif;
  font-size: 25px;
  margin-left: 20px;
  width: ${(props : { width : number }) => props.width }px;;

`
export const MonthArrow = styled(ArrowIconWrapper)`
    display: flex;
  justify-content: center;
  align-items: center;
`

export const TodayButton = styled.button`
  border: none;
  outline: none;
  background: #EFF6FF;
  color : #2563EB;
  border-radius: 4px;
  font-size: 18px;
  font-weight: normal;
  width: 73px;
  height: 30px;
  font-family: 'Barlow Semi Condensed', sans-serif;
  cursor: pointer;
`
export const SortText = styled.h4`
  margin-left: 10px;
  font-size: 18px;
  font-family: 'Barlow Semi Condensed', sans-serif;
  font-weight: normal;
  cursor: pointer;
`
export const Grey = styled.span`
  color: #94A3B8;
  
`
export const ArrowDownWrap = styled.div`
  height: 23px;
  width: 23px;
  margin-left: 5px;
  cursor: pointer;
`
export const HeaderInfoWrapper = styled.div`

  height: 100%;
  //width: 17%;
  display: flex;
  align-items: center;
`

export const CalendarTable = styled.table`
  width: 97%;
  border-radius: 4px;
  border: 1px solid #94A3B8;
  border-top: none;
  border-left: none;
  margin-left: 20px;
`
export const CalendarCell = styled.td`
  width: 164px;
  height: 135px;
  border-top: 1px solid #94A3B8;
  border-left: 1px solid #94A3B8;
  display: block;
  background: ${({dis} : {dis : boolean | void}) => dis ? '#F8FAFC' : 'white'};
  width: 100%;
  & > h2{
    color: ${({dis} : {dis : boolean | void}) => dis ? '#94A3B8' : '#475569'};
  }

`
export const CellTitle = styled.h2`
  font-size: 20px;
  color: #475569;
  margin-top: 10px;
  margin-left: 10px;
  width: 20px;
  margin-bottom: 0px;
  cursor: pointer;
`
export const CalenRow = styled.tr`
  width: 100%;
  display: flex;
`
export const WekkendRow = styled(CalenRow)`
  height: 56px;
  & > td{
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
   
  }
  
`
export const CelTasks = styled.div`
  width: 100%;
  height: 90px;
  &::-webkit-scrollbar{
    opacity: 0;
  }
  overflow-y: auto;
  padding: 0;
  margin: 0;
  //border: 1px solid red;
`
export const CellTask = styled.div`
  background: ${(props : any) => props.color.background};
  color: ${(props : any) => props.color.color};
  width: 93%;
  height: 30px;
  border-radius: 2px;
  font-size: 14px;
  display: flex;
  justify-content: flex-start;
  padding-left: 5px;
  margin-left: 3px;
  align-items: center;
  font-weight: normal;
  margin-top: 7px;
  border: 1px solid ${(props : any) => props.color.color};
  cursor: pointer;
`

