import { useState } from 'react'
import { Redirect, useHistory } from 'react-router-dom'
import Header from 'components/Header'
import FormItem from 'components/FormItem'
import { useAuth } from 'context/AuthContext'
import styled from 'styled-components'
import Button from 'components/Button'

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  margin: 2% 5%;
`

export const SubmitButton = styled(Button)`
  background-color: blue;
  margin: 2% 0;
`

const Form = () => {
  const [isSaving, setIsSaving] = useState(false)
  const [redirect, setRedirect] = useState(false)
  const history = useHistory()
  const { authState } = useAuth()

  const handleSubmit = e => {
    e.preventDefault()
    setIsSaving(true)

    const { title, quantity, price } = e.target.elements
    window
      .fetch('/api/post-item', {
        method: 'POST',
        headers: {
          Authorization: authState?.token
            ? `Bearer ${authState.token}`
            : undefined
        },
        body: JSON.stringify({
          title: title.value,
          quantity: Number(quantity.value),
          price: Number(price.value)
        })
      })
      .then(() => setRedirect(true))
  }

  if (redirect) {
    return <Redirect to='/' />
  }

  return (
    <>
      <Header title='Add New' goBack={() => history.push('/')} />
      <Wrapper>
        <form onSubmit={handleSubmit}>
          <FormItem label='Title' name='title' />
          <FormItem label='Quantity' name='quantity' />
          <FormItem label='Price' name='price' />
          <SubmitButton type='submit' disabled={isSaving}>
            Add Item
          </SubmitButton>
        </form>
      </Wrapper>
    </>
  )
}

export default Form
