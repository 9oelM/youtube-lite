import { constants as C } from './constants'

export const requestSearch = search => ({
  type: C.REQUEST_SEARCH,
  search,
})

export const getSearchResults = searchResults => ({
  type: C.GET_SEARCH_RESULTS,
  searchResults,
})
