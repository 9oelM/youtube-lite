import C from "./constants"

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

export const addToPlaylist = video => ({
  type: C.ADD_VIDEO,
  video,
})

export const deleteFromPlaylist = videoId => ({
  type: C.DELETE_VIDEO,
  videoId,
})
