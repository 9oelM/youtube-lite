import { combineReducers } from "redux"
import C from "../actions/constants"

function viewReducer(
  state = {
    isDrawerOpen: false,
  },
  action
) {
  switch (action.type) {
    case C.TOGGLE_DRAWER:
      return {
        ...state,
        isDrawerOpen: !state.isDrawerOpen,
      }
    default:
      return state
  }
}

function searchReducer(
  state = {
    searchResults: [], // nothing is received as a result yet
    isFetching: false,
    searchWord: "",
  },
  action
) {
  switch (action.type) {
    // return new objects instead of modifying them
    case C.REQUEST_SEARCH:
      return {
        ...state,
        isFetching: true,
        searchWord: action.searchWord,
      }
    case C.RECEIVE_SEARCH:
      return {
        ...state,
        isFetching: false,
        searchResults: action.searchResults,
      }
    default:
      return state
  }
}

function playlistReducer(
  state = {
    playlist: [],
  },
  action
) {
  switch (action.type) {
    case C.ADD_VIDEO:
      return {
        ...state,
        playlist: [...state.playlist, action.video],
      }
    case C.DELETE_VIDEO:
      const index = state.playlist.findIndex(elem => elem.id == action.videoId)
      return {
        ...state,
        playlist: [...state.playlist].splice(index, 1),
      }
    default:
      return state
  }
}
const rootReducer = combineReducers({
  viewReducer,
  searchReducer,
  playlistReducer,
})

export default rootReducer
