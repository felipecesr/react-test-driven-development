import { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { useAuth } from 'context/AuthContext'
import Header from 'components/Header'
import FormItem from 'components/FormItem'
import { Wrapper, SubmitButton } from './Form'

const Login = () => {
  const { login } = useAuth()
  const [isSaving, setIsSaving] = useState(false)
  const [redirect, setRedirect] = useState(false)
  const [error, setError] = useState(null)

  function handleSubmit(e) {
    e.preventDefault()
    setIsSaving(true)
    const { username, password } = e.target.elements

    login({ username: username.value, password: password.value }).then(
      () => {
        setRedirect(true)
      },
      err => {
        setIsSaving(false)
        setError(err.json.error_description)
      }
    )
  }

  if (redirect) {
    return <Redirect to='/' />
  }

  return (
    <>
      <Header title='Login' />
      <Wrapper>
        <form onSubmit={handleSubmit}>
          <FormItem label='Username' name='username' />
          <FormItem label='Password' name='password' type='password' />
          <SubmitButton type='submit' disabled={isSaving}>
            Submit
          </SubmitButton>
          {error ? <div role='alert'>{error}</div> : null}
        </form>
      </Wrapper>
    </>
  )
}

export default Login
