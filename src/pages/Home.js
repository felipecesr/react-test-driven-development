import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import Header from 'components/Header'
import ListItem from 'components/ListItem'
import { useAuth } from 'context/AuthContext'
import styled from 'styled-components'

export const List = styled.ul`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  margin: 2% 5%;
`

const Home = () => {
  const [items, setItems] = useState(null)
  const [isLoading, seIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const history = useHistory()
  const { authState } = useAuth()

  useEffect(() => {
    const fetchItems = async () => {
      const response = await window.fetch('/api/get-all-items', {
        method: 'GET',
        headers: {
          Authorization: authState?.token
            ? `Bearer ${authState.token}`
            : undefined
        }
      })
      const data = await response.json()

      if (!response.ok) {
        setError(data[0])
      } else {
        setItems(data)
      }

      seIsLoading(false)
    }

    fetchItems()
  }, [authState.token])

  return (
    <>
      <Header title='My Shopping List' openForm={() => history.push('new')} />
      <div role='alert'>
        {isLoading ? 'Loading...' : error ? error.message : ''}
      </div>
      {items && (
        <List>
          {items.map(item => (
            <ListItem
              key={item._id}
              title={item.title}
              quantity={item.quantity}
              price={item.price}
            />
          ))}
        </List>
      )}
    </>
  )
}

export default Home
