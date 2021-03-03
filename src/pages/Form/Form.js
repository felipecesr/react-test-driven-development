import { useState } from 'react'
import { Redirect } from 'react-router-dom'
import Header from 'components/Header/Header'
import FormItem from 'components/FormItem/FormItem'
import * as S from './styles'

const Form = ({ history }) => {
  const [isSaving, setIsSaving] = useState(false)
  const [redirect, setRedirect] = useState(false)

  const handleSubmit = e => {
    e.preventDefault()
    setIsSaving(true)

    const { description, value, paid } = e.target.elements
    window
      .fetch('/api/save-expense', {
        method: 'POST',
        body: JSON.stringify({
          text: description.value,
          value: value.value,
          paid: paid.checked
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
          <FormItem label='Description' name='description' />
          <FormItem label='Value' name='value' />
          <FormItem label='Paid' name='paid' type='checkbox' />
          <S.SubmitButton type='submit' disabled={isSaving}>
            Submit
          </S.SubmitButton>
        </form>
      </S.Wrapper>
    </>
  )
}

export default Form
