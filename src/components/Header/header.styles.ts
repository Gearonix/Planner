import styled from 'styled-components'


export const HeaderElement = styled.header`
  height: 63px;
  width: 100%;
  background: #242526;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  position: relative;
  z-index: 5;
  -webkit-box-shadow: 4px 11px 8px 0px rgba(36, 37, 38, 1);
  -moz-box-shadow: 4px 11px 8px 0px rgba(36, 37, 38, 1);
  box-shadow: 4px 11px 8px 0px rgba(36, 37, 38, 1);
`

export const Logo = styled.div`
  display: flex;
  align-items: center;
  margin-left: 17px;

  & > svg {
    width: 30px;
    height: 30px;
    color: white;
  }
`

export const LogoText = styled.h4`
  font-size: 18px;
  color: white;
  font-weight: normal;
  margin: 0;
  margin-left: 12px;

`



export const BurgerWrapper = styled.div`
  width: 45px;
  height: 45px;
  margin-left: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 200ms;

  &:hover {
    color: #f7f7f7;
  }
`

export const BurgerIconWrapper = styled.div`
  & > svg {
    width: 24px;
    height: 24px;
    color: white;
    display: flex;
    justify-content: center;
  }

  & > svg:hover {
    color: #e3e1e1;
  }
`

export const TodayButton = styled.button`
  background: #242526;
  outline: none;
  height: 36px;
  width: 66px;
  border-radius: 4px;
  margin-left: 40px;
  border: 1px solid #d9d9d9;
  color: white;
  font-size: 17px;
  cursor: pointer;
  transition: background 200ms;

  &:hover {
    color: #d9d9d9;
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
    width: 20px;
    height: 20px;
    color: white;
    margin-left: 12px;
    cursor: pointer;
  }

  & > *:hover {
    color: #d9d9d9;
  }

  display: flex;
  align-items: center;
  justify-content: center;
`

export const ArrowsBlock = styled.div`
  width: 60px;
  display: flex;
  height: 100%;
  margin-left: 8px;
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

