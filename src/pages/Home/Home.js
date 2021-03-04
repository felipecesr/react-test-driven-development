import { useState, useEffect } from 'react'
import Header from 'components/Header/Header'
import ListItem from 'components/ListItem/ListItem'

const Home = ({ history }) => {
  const [items, setItems] = useState([])
  const [isLoading, seIsLoading] = useState(true)

  useEffect(() => {
    const fetchItems = async () => {
      const response = await window.fetch('/api/expenses')
      const data = await response.json()

      setItems(data)
      seIsLoading(false)
    }

    fetchItems()
  }, [])

  return (
    <>
      <Header title='My List' openForm={() => history.push('new')} />
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <ul>
          {items.map(item => (
            <ListItem
              key={item._id}
              label={item.text}
              name={item.text}
              value={45.9}
              isPaid={item.paid}
            />
          ))}
        </ul>
      )}
    </>
  )
}

export default Home
