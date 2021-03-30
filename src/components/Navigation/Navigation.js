import { useAuth } from 'context/AuthContext'

const Navigation = () => {
  const { authState, logout } = useAuth()

  return (
    <nav>
      Hello {authState?.userInfo?.full_name && authState.userInfo.full_name}
      <button onClick={() => logout()}>Log Out</button>
    </nav>
  )
}

export default Navigation
