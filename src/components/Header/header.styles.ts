import styled from 'styled-components'


export const HeaderElement = styled.header`
  height: 80px;
  width: 100%;
  border-bottom: 1px solid #d9d9d9;
  background: white;
  box-sizing: border-box;
  display: flex;
  align-items: center;
`

export const Logo = styled.h1`
  font-size: 43px;
  font-family: 'Zen Dots', cursive;
  color: #424242;
  margin: 0;
  padding: 0;
  margin-left: 15px;
  margin-top: 13px;
  text-shadow: #817F7F 2px 5px;
`
export const BurgerWrapper = styled.div`
  border-radius: 100%;
  width: 45px;
  height: 45px;
  border: 2px solid #3B82F6;
  margin-left: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 200ms;

  &:hover {
    background: #F4F4F4;
  }
`

export const BurgerIconWrapper = styled.div`
  & > * {
    width: 24px;
    height: 24px;
    color: #3B82F6;
    display: flex;
    justify-content: center;
  }
`


export const TodayButton = styled.button`
  border: none;
  outline: none;
  background: #EFF6FF;
  height: 36px;
  width: 130px;
  border-radius: 10px;
  margin-left: 60px;
  border: 1px solid #3B82F6;
  color: #424242;
  font-size: 17px;
  cursor: pointer;
  transition: background 200ms;

  &:hover {
    background: #D4E7FF;
  }
`
export const TodayTitle = styled.h2`
  font-size: 23px;
  color: #424242;
  font-weight: normal;
  margin-left: 25px;
  margin-right: 50px;
`

export const ArrowIconWrapper = styled.div`
  & > * {
    width: 25px;
    height: 25px;
    color: #3B82F6;
    margin-left: 20px;
    cursor: pointer;
  }

  & > *:hover {
    background: #F4F4F4;
  }
  display: flex;
  align-items: center;
  justify-content: center;
`

export const SettingsBlock = styled.div`
  height: 60px;
  width: 5.5%;
  position: absolute;
  right: 50px;
  display: flex;
  align-items: center;
  
  justify-content: space-between;
`



export const SettingsIconWrapper = styled.div`
    & > *{
      color: #3B82F6;
      width: 27px;
      height: 27px;
    
    }
    cursor: pointer;
  display: flex;
  align-items: center;
`
export const UserImage = styled.img`
  border-radius: 100%;
  width: 50px;
  height: 50px;
  
`

