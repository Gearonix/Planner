import styled from 'styled-components'

export const ChangeModalElement = styled.div`
  width: 460px;
  height: 230px;
  background-color: white;
  border-radius: 14px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  position: absolute;
  z-index: 2;
`
export const ModalImage = styled.img`
  width: 100%;
  height: 100%;
  position: absolute;
`
export const ImageBlock = styled.div`
  width: 100%;
  height: ${({isImage} : {isImage?: boolean}) => isImage  ? '150px' : '40px'}; ;
  position: relative;
`
export const CircleButton = styled.div`
      
  background-color: ${({isImage} : {isImage?: boolean}) => isImage  ? '#1d1e20' : 'transparent'};   
  opacity: 0.7;
  width: 32px;
  height: 32px;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;

  & > *{
    color: ${({isImage} : {isImage?: boolean}) => isImage  ? 'transparent' : '#1d1e20'};
    width: 18px;
    height: 18px;
  }
  cursor: pointer;
`
export const CircleButtonBlock = styled.div`
  height: 40px;
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`

export const MainBlock = styled.div`
  width: 100%;
  height: 150px;
  display: flex;
  margin-top: 15px;
`
export const ColorBlock = styled.div`
  height: 100%;
  width: 17%;
`
export const InfoBlock = styled.div`
  height: 100%;
  width: 83%;
`
export const Color = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 4px;
  background: ${({color} : {color: any}) => color.background};
  margin: 0 auto;
  border: 1px solid ${({color} : {color: any}) => color.color};;
  margin-top: 3px;
`
export const Title = styled.h2`
  color: #555;
  font-size: 22px;
  font-weight: normal;
  margin: 0;
  
`
export const Description = styled.p`
  color: #666;
  font-size: 14px;
  font-weight: normal;
  margin: 0;
  height: 17px;
  
`

export const InfoIcon = styled(CircleButton)`
  margin: 0 auto;
  margin-top: 75px;
  height: 26px;
`
