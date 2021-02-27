import { useState, useEffect } from 'react'
import ListItem from 'components/ListItem/ListItem'

const List = () => {
  const [items, setItems] = useState([])
  const [isLoading, seIsLoading] = useState(true)

  useEffect(() => {
    const fetchItems = async () => {
      const response = await window.fetch('/api/expenses', {
        method: 'GET',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const data = await response.json()

      setItems(data)
      seIsLoading(false)
    }

    fetchItems()
  }, [])

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <ul>
      {items.map(item => (
        <ListItem
          key={item._id}
          id={item._id}
          description={item.text}
          isChecked={item.paid}
        />
      ))}
    </ul>
  )
}

export default List
