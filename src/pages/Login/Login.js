import { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { useAuth } from 'context/AuthContext'

const Login = () => {
  const { auth, setAuthState } = useAuth()
  const [isSaving, setIsSaving] = useState(false)
  const [redirect, setRedirect] = useState(false)
  const [error, setError] = useState(null)

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
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor='username-field'>Username</label>
        <input id='username-field' type='text' name='username' />
      </div>
      <div>
        <label htmlFor='password-field'>Password:</label>
        <input id='password-field' type='password' name='password' />
      </div>
      <div>
        <button type='submit' disabled={isSaving}>
          Submit
        </button>
      </div>
      {error ? <div role='alert'>{error}</div> : null}
    </form>
  )
}

export default Login
