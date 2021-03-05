import { takeLatest, put, call } from 'redux-saga/effects'

const fetchItems = async url => {
  const response = await window.fetch(url)
  const data = await response.json()

  if (!response.ok) {
    const message = data[0].message
    throw new Error(message)
  }

  return data
}

function* getItems() {
  try {
    const items = yield call(fetchItems, '/api/items')

    yield put({ type: 'GET_ITEMS_SUCCESS', payload: items })
  } catch (error) {
    yield put({ type: 'GET_ITEMS_ERROR', payload: error })
  }
}

export default function* rootSaga() {
  yield takeLatest('GET_ITEMS_REQUEST', getItems)
}
