import styled from 'styled-components'

export const Wrapper = styled.li`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  background-color: lightgray;
  border-radius: 5px;
  margin-bottom: 1em;
`

export const Label = styled.label`
  input:checked + & {
    text-decoration: line-through;
  }
`
