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
    /*
        It's important to return the previous state for any unknown action.
        */
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
const rootReducer = combineReducers({
  viewReducer,
  searchReducer,
})

export default rootReducer
