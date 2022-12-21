import styled from 'styled-components'

export const MonthBlock = styled.div`
  border-radius: 4px;
  width: 87%;
  opacity: 0.98;
  height: 100%;
  position: absolute;
  z-index: 0;
  margin-left: 250px;
`

export const CellTask = styled.div`
  background: ${(props: any) => props.theme.background};
  color: ${(props: any) => props.theme.color} !important;
  width: 93%;
  height: 30px;
  border-radius: 2px;
  font-size: 14px;
  display: flex;
  justify-content: flex-start;
  padding-left: 5px;
  margin-left: 3px;
  align-items: center;
  font-weight: normal;
  margin-top: 7px;
  border: 1px solid ${(props: any) => props.theme.color};
  cursor: pointer;
`
