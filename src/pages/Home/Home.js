import { useState, useEffect } from 'react'
import Header from 'components/Header/Header'
import ListItem from 'components/ListItem/ListItem'

const Home = ({ history }) => {
  const [items, setItems] = useState([])
  const [isLoading, seIsLoading] = useState(true)

  useEffect(() => {
    const fetchItems = async () => {
      const response = await window.fetch('/api/items')
      const data = await response.json()

      setItems(data)
      seIsLoading(false)
    }

    fetchItems()
  }, [])

  return (
    <>
      <Header title='My Shopping List' openForm={() => history.push('new')} />
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <ul>
          {items.map(item => (
            <ListItem
              key={item._id}
              title={item.title}
              quantity={item.quantity}
              price={item.price}
            />
          ))}
        </ul>
      )}
    </>
  )
}

export default Home
