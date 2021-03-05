import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Header from 'components/Header/Header'
import ListItem from 'components/ListItem/ListItem'
import * as S from './styles'

const Home = ({ history }) => {
  const { loading, items, error } = useSelector(state => state)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch({ type: 'GET_ITEMS_REQUEST' })
  }, [dispatch])

  return (
    <>
      <Header title='My Shopping List' openForm={() => history.push('new')} />
      <div>{loading ? 'Loading...' : error ? error.message : ''}</div>
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
