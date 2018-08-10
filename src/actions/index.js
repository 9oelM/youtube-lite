import C from './constants'

export const requestSearch = search => ({
  type: C.REQUEST_SEARCH,
  search,
})

export const getSearchResults = searchResults => ({
  type: C.GET_SEARCH_RESULTS,
  searchResults,
})

export const toggleDrawer = isDrawerOpen => ({
  type: C.TOGGLE_DRAWER,
  isDrawerOpen,
})
