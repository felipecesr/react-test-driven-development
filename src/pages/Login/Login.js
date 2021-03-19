import { useState } from 'react'
import { useIdentityContext } from 'react-netlify-identity'
import { Redirect } from 'react-router-dom'

const Login = () => {
  const { loginUser } = useIdentityContext()
  const [redirect, setRedirect] = useState(null)

  function handleSubmit(e) {
    e.preventDefault()
    const { email, password } = e.target.elements

    loginUser(email.value, password.value).then(() => {
      setRedirect('/new')
    })
  }

  if (redirect) {
    return <Redirect to={redirect} />
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor='email-field'>Email</label>
        <input id='email-field' type='email' name='email' />
      </div>
      <div>
        <label htmlFor='password-field'>Password:</label>
        <input id='password-field' type='password' name='password' />
      </div>
      <div>
        <button type='submit'>Submit</button>
      </div>
    </form>
  )
}

export default Login
