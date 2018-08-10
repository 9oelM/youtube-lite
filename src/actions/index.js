import C from './constants'

export const requestSearch = searchWord => ({
  type: C.REQUEST_SEARCH,
  searchWord,
})

export const receiveSearch = searchResults => ({
  type: C.RECEIVE_SEARCH,
  searchResults,
})

export const toggleDrawer = isDrawerOpen => ({
  type: C.TOGGLE_DRAWER,
  isDrawerOpen,
})

// Thunk action creator
export function fetchSearchResults(searchWord){
  return (dispatch) => {
    dispatch(requestSearch(searchWord))
  }
}