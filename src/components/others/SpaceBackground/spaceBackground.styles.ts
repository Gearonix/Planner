import styled from "styled-components";
import {devices} from "../../../setup/constants";

export const PageContainer = styled.div`
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;
  position: relative;

  & > * {
    overflow-y: hidden !important;
  }
`
export const RockObject = styled.img`
  width: 140px;
  height: 140px;
  position: absolute;
  opacity: 0.8;
  @media ${devices.laptopM} {
    display: none;
  }
`

export const Cloud = styled(RockObject)`
  left: ${(props: { coords: any, size: any }) => props.coords[0]}%;
  top: ${(props: { coords: any, size: any }) => props.coords[1]}%;
  z-index: 0;
  opacity: ${(props: any) => props.size === 60 ? '0.05' : '0.2'};
  width: ${(props: { coords: any, size: number }) => props.size}px;
  height: ${(props: { coords: any, size: any }) => props.size}px;
  @media ${devices.tablet} {
    display: none;
  }
`

export const Earth = styled(RockObject)`
  left: 7%;
  top: 67%;
  width: 120px;
  height: 120px;

`



