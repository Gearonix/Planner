import styled, {keyframes} from 'styled-components';
import {styled as mui} from '@mui/material/styles';
import TextField from "@mui/material/TextField";
import FormHelperText from '@mui/material/FormHelperText';
import {devices} from '../../../setup/constants';

const loginAnimation = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`
export const LoginSection = styled.div`
  width: 40%;
  height: 100%;
  border-radius: 10px;
  background: rgb(36, 37, 38, 0.8);
  position: absolute;
  right: 0;
  border: 1px solid transparent;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  z-index: 3;
  -webkit-box-shadow: -95px 4px 8px 0 rgb(36, 37, 38, 0.8);
  -moz-box-shadow: -95px 4px 8px 0 rgb(36, 37, 38, 0.8);
  box-shadow: -95px 4px 8px 0 rgb(36, 37, 38, 0.8);
  animation: ${loginAnimation};
  animation-duration: 1s;
  @media ${devices.laptopXS} {
    width: 100%
  }

`

export const LoginWrapper = styled.div`
  width: 60%;
  height: 80%;
  margin: 200px auto 0 auto;
  position: relative;
  @media ${devices.tablet} {

  }
  @media ${devices.laptopXS} {
    width: 280px;
  }

`

export const WelcomeBack = styled.h3`
  font-size: 16px;
  margin: 0;
  color: #c4c4c4;
  font-weight: normal;
`

export const InputTitle = styled(WelcomeBack)`
  color: #e3e3e3;
  margin-bottom: 10px;
  margin-top: 10px;

`

export const Error = mui(FormHelperText)`
    color: #f44336;
    font-size: 16px;

`

export const LoginTitle = styled.h2`
  font-size: 32px;
  line-height: 1.2;
  margin: 6px 0 20px 0;
  font-weight: 400;
  color: #e3e3e3;
  @media ${devices.laptopL} {
    font-size: 27px;
  }
  @media ${devices.laptopS} {
    font-size: 24px;
  }
  @media ${devices.laptopXS} {
    font-size: 29px;
  }
  @media ${devices.mobileL} {
    font-size: 25px;
  }
  @media ${devices.laptopXS} {
    width: 377px;
  }

`

export const Input = mui(TextField)`
    background: white;
    outline: none !important;
    border-radius: 4px;
    box-shadow: 0 0 3px #ddd;
    margin-bottom: 11px;
    fieldset {
        border-radius: 4px;
        border-width: 2px !important;
        border: none !important;
    }
   width: 340px;
    @media ${devices.laptopL}{
        width: 300px
    }
     // @media ${devices.laptopM}{
     //    width: 377px
    // }
    @media ${devices.mobileL} {
        height: 49px;
        width: 280px;
    }
`

export const ButtonContainer = styled.div`
  width: 80%;
  height: 40px;
  margin: 0;
  position: relative;

`

export const Button = styled.div`
  cursor: pointer;
  font: 700 30px consolas;
  color: #fff;
  text-decoration: none;
  padding: 20px 60px;
  font-weight: normal;
  position: absolute;
  overflow: hidden;
  border-radius: 5px;
  transition: 0.2s;
  margin-top: 20px;
  height: 12px;
  text-align: center;
  width: 219px;

  @media ${devices.laptopL} {
    width: 180px
  }
  @media ${devices.laptopXS} {
    padding: 0;
    width: 300px;
    height: 56px;
  }

  @media ${devices.mobileL} {
    height: 47px;
    width: 280px;
  }

  &:hover {
    box-shadow: 0 0 5px #7293ff, inset 0 0 5px #7293ff;
    transition-delay: 0.2s;
  }
`
export const ButtonTitle = styled.span`
  margin: 0 auto;
  z-index: 0;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  color: #fff;
  font-size: 21px;
  text-align: center;
  @media ${devices.mobileL} {
    font-size: 18px;
  }

`

const animateButton = keyframes`
    from{
      transform: translate(-25%, -75%) rotate(0);
    }
    to{
      transform: translate(-25%, -75%) rotate(360deg);
    }
`
export const ButtonInner = styled.div`
  position: absolute;
  top: -60px;
  left: 0;
  padding: 0;
  width: 100%;
  height: 200px;
  background: ${(props: { isPink: boolean }) => props.isPink ? '#e3667d' : '#7293ff'};
  box-shadow: inset 0 0 50px rgba(0, 0, 0, 0.7);
  z-index: -1;
  transition: 0.6s;
  @media ${devices.laptopXS} {
    width: 377px;
    & > * {
      display: none;
    }
  }
  @media ${devices.mobileL} {
    width: 300px
  }


  &:before {
    position: absolute;
    content: "";
    width: 200%;
    height: 200%;
    top: 0;
    left: 0;
    transform: translate(-25%, -75%);
  }
}

&:before {
  position: absolute;
  content: "";
  width: 200%;
  height: 200%;
  top: 0;
  left: 0;
  transform: translate(-25%, -75%);
  }

  &:after {
    border-radius: 45%;
    background: rgba(20, 20, 20, 1);
    box-shadow: 0 0 10px 5px #7293ff, inset 0 0 5px #7293ff;
    animation: ${animateButton} 5s linear infinite;
    opacity: 0.8;
  }

  &:before {
    border-radius: 40%;
    box-shadow: 0 0 10px rgba(26, 26, 26, 0.5),
    inset 0 0 5px rgba(26, 26, 26, 0.5);
    background: rgba(26, 26, 26, 0.5);

    animation: ${animateButton} 7s linear infinite;
  }

  &:hover {
    top: -120px;
  }

`

export const LinkContainer = styled.div`
  width: 80%;
  height: 20px;
  margin: 120px 0 0 0;
`

export const SwitchPageLink = styled.div`
  margin: 0;
  width: 100%;

  & > a {
    text-decoration: none;
    color: #e3e3e3;
    font-size: 16px;
    font-weight: normal;
    @media ${devices.laptopL} {
      font-size: 14px;
    }

  }

  @media ${devices.laptopM} {
    width: 320px;
  }
`




