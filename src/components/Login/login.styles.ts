import styled,{keyframes} from 'styled-components';


export const PageContainer = styled.div`
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
    
    

`

export const LoginWrapper = styled.div`
  width: 22%;
  height: 650px;
  border-radius: 10px;
  background: white;
  margin: 0 auto;
  margin-top: 25px;
  border: 1px solid transparent;
  display: flex;
  flex-direction: column;
  align-items: center;
  
`
export const LoginTitle = styled.h2`
  font-size: 28px;
  line-height: 1.2;
  margin-top: 77px;
  text-align: center;
  margin-bottom: 20px;
  font-weight: 800;
  color: #333;
  
`

export const IconWrapper = styled.div`
  width: 60px;
  height: 60px;
  margin: 0 auto;
  margin-bottom: 48px;
`





export const Input = styled.input`
    outline: none;  
    border: none;
    width: 100%;
    height: 100%;
    color : #555;
    font-size: 14px;
  font-weight: normal;
  border-bottom: #a6a6a6 solid 2px;
  &:focus{
    border-image: linear-gradient(to right,#7293ff,pink);
    border-image-slice: 1;
  }
  -webkit-text-security: ${({isPassword} : {isPassword : boolean     }) => isPassword ? 'disc' : 'none'};
`
const inputTransition = keyframes`
  from{
    top: 0;
  }
  to{
    top: -20px;
  }


`

export const InputWrapper = styled.div`
  width: 69%;
  height: 37px;
  margin-bottom: 37px;
  position: relative;
  border: none;
  &:focus-within > span{
    animation: ${inputTransition};
    animation-duration: 250ms;
    animation-fill-mode: forwards;
  }
`

export const EyeIconWrapper = styled.div`
  width: 13px;
  height: 13px;
  color: #a9a9a9;
  position: absolute;
  top: 10px;
  right: 5px;
  cursor: pointer;
`


export const InputPlaceholder = styled.span`
        display: block;
  position: absolute;
  top: 10px;
  left: 0;
  color: #a9a9a9;
  font-weight: normal;
  font-size: 14px;
  font-weight: 400;

`





export const Error = styled.h2`
  color: red;
  display: none;
`



export const Button = styled.div`
  cursor: pointer;
  border-radius: 25px;
  font: 700 30px consolas;
   color: #fff;
   text-decoration: none;
   text-transform: uppercase;
   padding: 20px 60px;
   position: relative;
   overflow: hidden;
   border-radius: 40px;
   transition: 0.2s;
   transform: scale(0.65);
  margin-top: 20px;
   width: 69%;
  text-align: center;
   
  &:hover{
      box-shadow: 0 0 5px #7293ff, inset 0 0 5px #7293ff;
      transition-delay: 0.2s;
  }
`
export const ButtonTitle = styled.span`
    margin: 0 auto;
  position: relative;
   z-index: 0;
   color: #fff;
  text-align: center;

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
  width: 100%;
  height: 200px;
  background: ${(props : {isPink : boolean}) => props.isPink ? '#e3667d'  : '#7293ff'};
  box-shadow: inset 0 0 50px rgba(0, 0, 0, 0.7);
  z-index: -1;
  transition: 0.6s;
  &:before {
    position: absolute;
    content: "";
    width: 200%;
    height: 200%;
    top: 0;
    left: 0;
    transform: translate(-25%, -75%);
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
  &:after{
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

export const SwitchPageLink = styled.div`
  margin: 0 auto;
  margin-top: 115px;
  & > a{
    text-decoration: none;
    color: #555;
    font-size: 15px;
  }
`
const PrealoderAnimation1 = keyframes`
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
`
const PrealoderAnimation2 = keyframes`
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(24px, 0);
  }
`

const PrealoderAnimation3 = keyframes`
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }

`
export const Preloader = styled.div`
  display: inline-block;
  position: absolute;
  width: 80px;
  height: 80px;
  left: 0;
  right: 0;
  margin: 0 auto;
  margin-top: 480px;
  & > div {
    position: absolute;
    top: 33px;
    width: 13px;
    height: 13px;
    border-radius: 50%;
    background: #333;
    animation-timing-function: cubic-bezier(0, 1, 1, 0);
  }
  & > div:nth-child(1){
    left: 8px;
    animation: ${PrealoderAnimation1} 0.6s infinite;
  }
  & > div:nth-child(2){
    left: 8px;
    animation: ${PrealoderAnimation2} 0.6s infinite;
  }
  & > div:nth-child(3){
    left: 32px;
    animation: ${PrealoderAnimation2} 0.6s infinite;
  }
  & > div:nth-child(4){
    left: 56px;
    animation: ${PrealoderAnimation3} 0.6s infinite;
  }
`









