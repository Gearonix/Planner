import styled from 'styled-components'
import {devices} from '../../setup/constants'
import {isItLaptop} from "../../utils/tools";


export const AboutBlock = styled.div`
  width: 50%;
  border-radius: 20px;
  position: absolute;
  left: 50%;
  top: 40%;
  z-index: 4;
  transform: translate(-50%, -50%);
  height: 500px;
  background: rgba(36, 37, 38, 0.85);
  @media ${devices.laptopM} {
    width: 70%;
  }
  @media ${devices.mobileXL} {
    width: 90%
  }

`

export const Title = styled.h1`
  text-align: center;
  color: white;
  margin: 0;
  margin-top: 20px;
  font-weight: normal;
  @media ${devices.tablet} {
    font-size: 28px;
  }
  @media ${devices.mobileL} {
    font-size: 23px;
  }
`
export const Info = styled.p`
  margin: 0;
  margin-top: ${() => !isItLaptop() ? 40 : 20}px;
  text-align: center;
  color: white;
  font-weight: normal;
  line-height: 29px;
  font-size: 20px;
  @media ${devices.tablet} {
    font-size: 16px;
  }
  @media ${devices.mobileL} {
    font-size: 13px;
  }
`

export const DeviceError = styled.p`
  color: #bd2436;
  text-align: center;

  width: 70%;
  margin: 0 auto;
`


export const IconsBlock = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-template-columns: 1fr 1fr 1fr;
  width: 50%;
  margin: 0 auto;
  margin-top: 20px;
  height: 200px;

  & > svg {
    display: block;
    width: 60px;
    height: 60px;
    margin: 0 auto;
    @media ${devices.mobileL} {
      width: 50px;
      height: 50px;
    }
  }
`
export const Link = styled.a`
  color: #61dafb;
  text-decoration: none;
`
export const GitIcon = styled.a`
  position: absolute;
  right: 20px;
  top: 20px;

  & > svg {
    width: 28px;
    height: 28px;
    color: white;
  }

  cursor: pointer;
`
export const BackIcon = styled(GitIcon)`
  right: 0;
  left: 20px;

  & > svg {
    width: 27px;
    height: 27px;
  }
`
