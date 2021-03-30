import { useState } from 'react'
import { Redirect, useHistory } from 'react-router-dom'
import Header from 'components/Header/Header'
import FormItem from 'components/FormItem/FormItem'
import { useAuth } from 'context/AuthContext'
import * as S from './styles'

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
          Authorization: `Bearer ${authState.token}`
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
      <S.Wrapper>
        <form onSubmit={handleSubmit}>
          <FormItem label='Title' name='title' />
          <FormItem label='Quantity' name='quantity' />
          <FormItem label='Price' name='price' />
          <S.SubmitButton type='submit' disabled={isSaving}>
            Add Item
          </S.SubmitButton>
        </form>
      </S.Wrapper>
    </>
  )
}

export default Form
