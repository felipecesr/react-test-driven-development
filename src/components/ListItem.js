import styled from 'styled-components'

const Wrapper = styled.li`
  display: flex;
  text-align: left;
  align-items: center;
  padding: 1%;
  background-color: lightgray;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 2%;
  text-decoration: none;
`

const Title = styled.h2`
  flex-basis: 70%;
  font-size: 1.2em;
`

const Total = styled.span`
  flex-basis: 15%;
  font-weight: bold;
  text-align: right;
`

const ListItem = ({ title, quantity, price }) => (
  <Wrapper>
    <Title>{title}</Title>
    <Total>Quantity: {quantity}</Total>
    <Total>$ {price}</Total>
  </Wrapper>
)

export default ListItem
