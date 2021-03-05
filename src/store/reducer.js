const initialState = {
  loading: true,
  items: null,
  error: null
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'GET_ITEMS_SUCCESS':
      return {
        ...state,
        items: action.payload,
        loading: false
      }

    case 'GET_ITEMS_ERROR':
      return {
        ...state,
        items: null,
        loading: false,
        error: action.payload
      }

    default:
      return state
  }
}

export default reducer
