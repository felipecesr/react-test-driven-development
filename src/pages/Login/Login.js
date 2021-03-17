import { useState, useEffect, useRef } from 'react'
import { useIdentityContext } from 'react-netlify-identity'
import { useHistory } from 'react-router-dom'

const Login = () => {
  const { user, loginUser, signupUser } = useIdentityContext()
  const formRef = useRef()
  const [msg, setMsg] = useState('')
  const history = useHistory()

  useEffect(() => {
    if (user) {
      history.push('/')
    }
  }, [user, history])

  const signup = () => {
    const email = formRef.current.email.value
    const password = formRef.current.password.value

    signupUser(email, password)
      .then(user => {
        console.log('Success! Signed up', user)
        history.push('/')
      })
      .catch(err => console.error(err) || setMsg('Error: ' + err.message))
  }

  return (
    <form
      ref={formRef}
      onSubmit={e => {
        e.preventDefault()
        const email = e.target.email.value
        const password = e.target.password.value
        loginUser(email, password, true)
          .then(user => {
            console.log('Success! Logged in', user)
            history.push('/')
          })
          .catch(err => console.error(err) || setMsg('Error: ' + err.message))
      }}
    >
      <div>
        <label>
          Email:
          <input type='email' name='email' />
        </label>
      </div>
      <div>
        <label>
          Password:
          <input type='password' name='password' />
        </label>
      </div>
      <div>
        <input type='submit' value='Log in' />
        <button onClick={signup}>Sign Up </button>
        {msg && <pre>{msg}</pre>}
      </div>
    </form>
  )
}

export default Login
