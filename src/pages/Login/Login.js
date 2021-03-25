import { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import { useAuth } from 'context/AuthContext'
import Header from 'components/Header/Header'
import FormItem from 'components/FormItem/FormItem'
import * as S from '../Form/styles'

const Login = () => {
  const { auth, setAuthState } = useAuth()
  const [isSaving, setIsSaving] = useState(false)
  const [redirect, setRedirect] = useState(false)
  const [error, setError] = useState(null)
  const history = useHistory()

  function handleSubmit(e) {
    e.preventDefault()
    setIsSaving(true)
    const { username, password } = e.target.elements

    auth.login(username.value, password.value).then(
      res => {
        setAuthState({
          token: res.token.access_token,
          expiresAt: res.token.expires_at,
          userInfo: res.user_metadata
        })
        setRedirect(true)
      },
      err => {
        setIsSaving(false)
        setError(err.json.error_description)
      }
    )
  }

  if (redirect) {
    return <Redirect to='/new' />
  }

  return (
    <>
      <Header title='Login' goBack={() => history.push('/')} />
      <S.Wrapper>
        <form onSubmit={handleSubmit}>
          <FormItem label='Username' name='username' />
          <FormItem label='Password' name='password' type='password' />
          <S.SubmitButton type='submit' disabled={isSaving}>
            Submit
          </S.SubmitButton>
          {error ? <div role='alert'>{error}</div> : null}
        </form>
      </S.Wrapper>
    </>
  )
}

export default Login
