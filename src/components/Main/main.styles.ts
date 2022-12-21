import {ParallaxLayer} from '@react-spring/parallax'
import styled from 'styled-components'


export const MainPage = styled.div`
  width: 100%;
  position: relative;
  height: 1080px;
`
export const MainElement = styled.main`
  height: 100%;
  width: 100%;
  display: flex;
  background: #253237;

  & > * {
    overflow-y: hidden !important;
  }
`
export const Layer = styled(ParallaxLayer)`
  display: flex;
  height: 100%;
  width: 100%;
  position: absolute;
  justify-content: flex-start;
`
