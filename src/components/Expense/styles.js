import styled from 'styled-components'

export const Wrapper = styled.div`
  background-color: #fff;
  border-radius: 25px;
  box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 20%),
    0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1em;
`

export const Title = styled.h2`
  color: #757575;
  font-size: 1em;
  font-weight: 400;
  margin: 0;
`

export const Value = styled.div`
  color: #000;
  font-size: 1.4em;
  font-weight: 700;
`

export const Paid = styled.div`
  background-color: ${({ paid }) => (paid ? '#4caf50' : '#f44336')};
  border-radius: 50px;
  color: #fff;
  font-size: 0.8em;
  font-weight: 700;
  padding: 0.2em 1em 0.4em;
`
