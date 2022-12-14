import styled from 'styled-components'


export const MainPage = styled.div`
  width: 100%;
  position: relative;
  height: 1080px;

  & > *::-webkit-scrollbar {
    width: 0;
  }

  &::-webkit-scrollbar {
    width: 16px;
  }
`
export const MainElement = styled.main`
  height: 1000px;
  width: 100%;
  display: flex;

  & > div::-webkit-scrollbar {
    width: 0 !important;
  }

  & > * {
    overflow-y: hidden !important;
  }
`
