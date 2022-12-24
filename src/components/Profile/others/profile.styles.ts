import styled from "styled-components";
import {devices} from "../../../setup/constants";


export const ProfileWrapper = styled.div`
  width: 87%;
  margin: 0 auto;
`

export const MainContent = styled.div`
  padding: 32px 32px 0 32px;
`

export const ProfileTitle = styled.h1`
  font-size: 30px;
  margin-bottom: 30px;
  color: white;
  font-weight: 400;
`
export const GreyLine = styled.div`
  background: #f2f2f2;
  height: 1px;
  width: 100%;
  margin: 0 auto;
`
export const SmallerTitle = styled.h2`
  margin-top: 20px;
  margin-bottom: 26px;
  font-size: 24px;
  color: white;
  font-weight: 400;
`
export const InnerContainer = styled.div`
  height: 832px;
  width: 100%;
  display: flex;
  justify-content: space-between;
`
export const UserAvatarBlock = styled.div`
  width: 27%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`
export const UserImageElement = styled.img`
  width: ${(props: { size: number }) => props.size + 'px'};
  height: ${(props: { size: number }) => props.size + 'px'};
  border-radius: 100%;
  margin-left: 10px;
  border: 1px solid black;
  @media ${devices.laptopS} {
    width: ${(props: { size: number }) => props.size == 40 ? props.size : props.size - 30 + 'px'};
    height: ${(props: { size: number }) => props.size == 40 ? props.size : props.size - 30 + 'px'};
  }
`
export const EmptyAvatar = styled.div`
  width: ${(props: {
    size:
            number
  }) => props.size + 'px'};
  margin-left: 10px;
  margin-right: 10px;
  height: ${props => props.size + 'px'};
  border-radius: 100%;
  background: ${({color}: any) => color};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  object-fit: cover;
`
export const EmptyAvatarTitle = styled.h2`
  font-size: ${({fontSize}:
                        { fontSize: number }) => fontSize + 'px'};
  color: white;


`

export const AvatarButton = styled.div`
  width: 138px;
  margin-right: 10px;
  height: 35px;
  border: 1px solid white;
  color: white;
  position: relative;
  border-radius: 10px;
  margin-top: 16px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background 200ms;

  &:hover {
    background: #242530;
  }

  & > input {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0;
    cursor: pointer;
  }

  cursor: pointer;
`
export const AvatarButtonTitle = styled.span`
  text-align: center;
  font-weight: normal;
  color: white;
  font-size: 18px;
`

export const FieldsContainer = styled.div`
  width: 67%;
  height: 100%;
`
export const FieldBlock = styled.div`
  border-top: 2px solid #f2f2f2;
  display: flex;
  justify-content: space-between;
  align-items: center;
`
export const FieldTitle = styled.h4`
  font-size: 16px;
  color: white;
  font-weight: normal;
  margin-left: 2px;
`
export const FieldInput = styled.input`
  outline: none;
  width: ${({isPassword}:
                    { isPassword?: boolean }) =>
          isPassword ? '58%' : '67%'};
  margin-right: 2px;
  height: 30px;
  border: 1px solid #e6e6eb;
  border-radius: 8px;
  color: #525266;
  font-size: 16px;

  &:disabled {
    background: #f4f2f5;
    color: #9292a6;
  }

  padding-left: 10px;
  -webkit-text-security: ${({isPassword}: { isPassword?: boolean }) => isPassword ? 'disc' : 'none'};

  &::placeholder {
    color: #d2d2d4;
    font-size: 16px;
  }
`
export const ChangePasswordBlock = styled.div`
  width: 69%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const PasswordButton = styled(AvatarButton)`
  width: 32%;
  margin-bottom: 20px;
  height: 32px;
  font-size: 13px;
  margin-left: 25px;
  @media ${devices.laptopS} {
    font-size: 10px;
  }
`


export const PasswordBlock = styled.div`
  border-top: 2px solid #f2f2f2;
  display: flex;
  justify-content: space-between;
  height: 200px;
`
export const PasswordInputsBlock = styled.div`
  height: 100%;
  width: 69%;
  box-sizing: border-box;

`
export const PasswordInput = styled(FieldInput)`
  width: 95%;
  padding: 0 0 0 10px;
  margin: 16px auto 0 auto;
  -webkit-text-security: disc;
`
export const PasswordButtons = styled.div`
  height: 35px;
  width: 45%;
  margin-top: 16px;
  display: flex;
  align-items: center;
  justify-content: center;

  & > button {
    width: 45%;
    height: 80%;
  }
`
