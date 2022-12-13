import styled, {keyframes} from 'styled-components'
import {PasswordButton} from '../Profile/profile.styles'


export const AsideElement = styled.aside`
  width: 13%;
  height: 100%;
  border-right: 1px solid #d9d9d9;
  background: white;

  & > * {
    margin-left: 15px;
  }
  position: relative;
  animation: ${({isHide} : {isHide : boolean}) =>
          !isHide ? openAside : closeAside};
  animation-duration: 250ms;
  animation-fill-mode: forwards;
`

const openAside = keyframes`
  from{
    left: -13%
  }
  to{
    left: 0
    
  }
`

const closeAside = keyframes`
  from{
    left: 0
  }
  to{
    left: -13%
  }
`




export const AddButtonBlock = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;


`

export const AddButton  = styled(PasswordButton)`
  border: none;
  outline: none;
  height: 43px;
  width: 60%;
  background: white;
  font-size: 24px;
  color: white;
  border-radius: 20px;
  border: 1px solid #9d9d9d;
  
`
export const AddButtonText = styled.span`
  font-size: 18px;
  color: #444444;
  margin-left: 4px;
`

export const DropDownText = styled.h2`
  color: #434343;
  font-size: 17px;
  font-weight: normal;
  margin-left: 10px;
 
`
export const DropDownHeader = styled.div`
  height: 30px;
  width: 90%;
  margin-top: 15px;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  user-select: none;
  & > svg{
    width: 20px;
    height: 20px;
    margin-right: 8px;
  }
  transition: background 200ms;
  &:hover{
    background: #F1F1F2;
  }
  cursor: pointer;
`

export const HiddenCheckBox = styled.input`
  margin-left: 10px;
  position: absolute;
  &:checked + label::before{
    background: #7D7DEC;
  }
  position: absolute;
  opacity: 0;
  cursor: pointer;
  width: 18px;
  left: 0;
  top: 0;
  z-index: 1;
  height: 18px;
  &:not(:checked):hover + label::before{
    background: #E4E4E4;
    color: transparent;
  }
`

export const CheckBox = styled.label`
    &::before{
      width: 18px;
      height: 18px;
      border-radius: 3px;
      border: 2px solid #7D7DEC;
      display: inline-block;
      content: 'X';
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 10px;
      background: white;
      color: white;
      transition: background 200ms;
      
    }
   position: absolute;
  left: 0;
  top: 0;
`


export const DropDownBody = styled.div`
    //width: 18px;
    //height: 18px;
  transition: opacity 150ms;
  opacity: ${({hide} : {hide : boolean}) => 
          hide ? '0' : '1'};
    position: relative;
    & > *{
     margin: 0;
     padding: 0;
   }
  margin-left: 25px;
  width: 80%;
  height: 20px;
  margin-bottom: 10px;
`

export const DropDownBodyT = styled(DropDownText)`
  font-size: 16px;
  margin-left: 30px;
  margin-top: 0;
`

export const CalendarWrapper = styled.div`
  width: calc(100% - 20px);
  margin-left: 10px;
`



