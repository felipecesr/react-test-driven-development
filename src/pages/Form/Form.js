import { useState } from 'react'
import { Redirect, useHistory } from 'react-router-dom'
import Header from 'components/Header/Header'
import FormItem from 'components/FormItem/FormItem'
import * as S from './styles'

const Form = () => {
  const [isSaving, setIsSaving] = useState(false)
  const [redirect, setRedirect] = useState(false)
  const history = useHistory()

  const handleSubmit = e => {
    e.preventDefault()
    setIsSaving(true)

    const { title, quantity, price } = e.target.elements
    window
      .fetch('/api/save-item', {
        method: 'POST',
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
      <Header title='Add New' goBack={() => history.goBack()} />
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
