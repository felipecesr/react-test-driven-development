import styled from 'styled-components'
import Button from '../Button/Button'

export const Wrapper = styled.header`
  width: 100%;
  display: flex;
  justify-content: space-between;
  background-color: navajowhite;
`

export const Title = styled.h1`
  text-align: center;
  flex-basis: 60%;

  &:first-child {
    margin-left: 20%;
  }

  &:last-child {
    margin-right: 20%;
  }
`

export const HeaderButton = styled(Button)`
  margin: 10px 5%;
`
