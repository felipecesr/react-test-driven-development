const Login = ({ onSubmit }) => {
  function handleSubmit(e) {
    e.preventDefault()
    const { email, password } = e.target.elements

    onSubmit({
      email: email.value,
      password: password.value
    })
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
