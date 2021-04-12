import styled from 'styled-components'
import Button from './Button'

const Wrapper = styled.header`
  width: 100%;
  display: flex;
  justify-content: space-between;
  background-color: navajowhite;
`

const Title = styled.h1`
  text-align: center;
  flex-basis: 60%;

  &:first-child {
    margin-left: 20%;
  }

  &:last-child {
    margin-right: 20%;
  }
`

const HeaderButton = styled(Button)`
  margin: 10px 5%;
`

const Header = ({ goBack = false, title, openForm = false }) => (
  <Wrapper>
    {goBack && <HeaderButton onClick={goBack}>{'< go Back'}</HeaderButton>}
    <Title>{title}</Title>
    {openForm && <HeaderButton onClick={openForm}>+ Add New</HeaderButton>}
  </Wrapper>
)

export default Header
