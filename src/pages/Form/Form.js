import { useState, useEffect } from 'react'
import { Redirect, useHistory } from 'react-router-dom'
import { useAuth } from 'context/AuthContext'
import Header from 'components/Header/Header'
import FormItem from 'components/FormItem/FormItem'
import * as S from './styles'

const Form = () => {
  const { authState } = useAuth()
  const [isSaving, setIsSaving] = useState(false)
  const [redirect, setRedirect] = useState(false)
  const history = useHistory()

  // useEffect(() => {
  //   if (!user || !user.token) {
  //     history.push('/login')
  //   }
  // }, [user, history])

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
      <Header title='Add New' goBack={() => history.push('/')} />
      {authState?.userInfo?.full_name && (
        <>
          <div>Hello {authState.userInfo.full_name}</div>
          {/* <button onClick={() => logoutUser()}>Log Out</button> */}
        </>
      )}
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
