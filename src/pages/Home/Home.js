import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import Header from 'components/Header/Header'
import ListItem from 'components/ListItem/ListItem'
import * as S from './styles'

const Home = () => {
  const [items, setItems] = useState(null)
  const [isLoading, seIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const history = useHistory()

  useEffect(() => {
    const fetchItems = async () => {
      const response = await window.fetch('/api/items')
      const data = await response.json()

      if (!response.ok) {
        setError(data[0])
      } else {
        setItems(data)
      }

      seIsLoading(false)
    }

    fetchItems()
  }, [])

  return (
    <>
      <Header title='My Shopping List' openForm={() => history.push('new')} />
      <div role='alert'>
        {isLoading ? 'Loading...' : error ? error.message : ''}
      </div>
      {items && (
        <S.List>
          {items.map(item => (
            <ListItem
              key={item._id}
              title={item.title}
              quantity={item.quantity}
              price={item.price}
            />
          ))}
        </S.List>
      )}
    </>
  )
}

export default Home
