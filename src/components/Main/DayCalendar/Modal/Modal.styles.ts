import styled from 'styled-components'
import {InputElement} from '../../../Login/login.styles'


export const ModalElement=styled.div`
  width: 400px;
  height: ${({isBackground} : {isBackground ?: boolean}) => isBackground ? 650 : 500}px;
  border-radius: 14px;
  background: white;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  position: absolute;
  z-index: 1;
`

export const ModalDraggable = styled.div`
  border-bottom: 2px solid #a6a6a6;
  height: 35px;
  width: 100%;
  border-radius: 5px;
  margin-bottom: 5px;
  //background: #F8F8F8;
  cursor: grab;
  display: flex;
  justify-content: space-between;
  align-items: center;
  & > *{
    color: #696969;
    width: 22px;
    height: 22px;
    margin-right: 10px;
    margin-left: 10px;
    
  }
`


export const ModalWrapper = styled.div`
  width: ${({w} : {w ?: number}) => w ? w+'%' : '90%'};
  height: 100%;
  margin: 0 auto;
  padding-left: 20px;
`
export const ModalInput = styled(InputElement)`
    margin-top: 15px;
    font-size: 25px;
    border-bottom-width: 1px;
  height: 40px
`

type btnContProps = {
    w ?: number,
    jc ?: string
}

export const ButtonsContainer = styled.div`
  width: ${({w} : btnContProps) => w ? w+'%' : '70%'};
  display: flex;
  height: 50px;
  align-items: center;
  margin-top: 2px;
  justify-content: ${({jc} : btnContProps) => jc ? jc : 'flex-start'};
`

export const TimeWrapper = styled.div`
  width: 75%;
  height: 33px;
  margin-top: 10px;
`

export const TaskImage = styled.img`
  width: 100%;
  height: 140px;
  margin-top: 15px;
  border-radius: 20px;
  margin-bottom: 10px;
  box-shadow: 0 0 2px 1px rgba(0, 140, 186, 0.5);
`
export const SendButtonsWrapper = styled.div`
  width: 130%;
  height: 52px;
  margin-top: 10px;
  display: flex;
  justify-content: flex-end;

`
