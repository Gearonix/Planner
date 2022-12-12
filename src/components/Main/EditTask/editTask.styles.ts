import styled from 'styled-components'
import { styled as mui} from '@mui/material/styles';
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';

export const EditTaskPage = styled.div`
  width: 100%;
  height: 100%;
  background: #fff;

`

export const SaveBlock = styled.div`
  width: 70%;
  height: 400px;
  display: flex;
  margin-bottom: 15px;
  margin-top: 25px;
`

export const CrossContainer = styled.div`
  width: 7%;
  height: 100%;
  display: flex;
  justify-content: center;
  & > * {
    color : #5f6368;
    width: 27px;
    height: 27px;
    margin-top: 25px;
    cursor: pointer;
  }
`
export const TitleContainer = styled.div`
  width: 60%;
  height: 100%;
`
export const SaveButtonsContainer = styled.div`
  width: 30%;
  height: 100%;
  margin-left: 15px;
  display: flex;
  justify-content: center;
`

export const SaveButton = mui(Button)`
    width: 121px;
    height: 40px;
    margin-top: 16px;
    margin-right: 16px;
`

export const TimeSettingsWrapper = styled.div`
  width: 70%;
  height: 50px;
`

export const TitleInput = mui(TextField)`
    width: 100%;
    font-size: 25px;
`

export const DateSelectBlock = styled.div`
  //height: 40%;
  width: 100%;
  padding-top: 15px;
  display: flex;
`

export const SymbolText = styled.h4`
  font-size: 15px;
  color: #3c4043;
  margin: 0;
  margin-top: 13px;
  margin-left: 5px;
  margin-right: 5px;
  font-weight: normal;
`


export const MarginBottom = styled.div`
  margin-bottom: 10px;
`

export const UserNameWrapper = styled.div`
  & > svg {
    color : #3c4043;
    width: 20px;
    height: 20px;
    font-weight: normal;
    margin-top: 10px;
    margin-right: 10px;
  }
  & > h5{
    margin-bottom: 0;
    margin-top: 10px;
    font-size: 14px;
    color : #3c4043;
  }
  display: flex;
  margin-bottom: 20px;
`

