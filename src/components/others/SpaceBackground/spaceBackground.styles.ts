import styled from "styled-components";

export const PageContainer = styled.div`
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;

  & > * {
    overflow-y: hidden !important;
  }
`
export const RockObject = styled.img`
  width: 140px;
  height: 140px;
  position: absolute;
  opacity: 0.8;
`

export const Cloud = styled(RockObject)`
  left: ${(props: { coords: any, size: any }) => props.coords[0]}%;
  top: ${(props: { coords: any, size: any }) => props.coords[1]}%;
  z-index: 0;
  opacity: ${(props: any) => props.size == 60 ? '0.05' : '0.2'};
  width: ${(props: { coords: any, size: number }) => props.size}px;
  height: ${(props: { coords: any, size: any }) => props.size}px;
`

export const Earth = styled(RockObject)`
  left: 7%;
  top: 67%;
  width: 120px;
  height: 120px;

`



