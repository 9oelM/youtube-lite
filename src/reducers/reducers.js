import { combineReducers } from 'redux'
import C from '../actions/constants'

const initialState = {
  searchResults: [], // nothing is received as a result yet
}

function youtubeLiteView(state = initialState, action) {
  switch (action.type) {
    // return new objects instead of modifying them
    case C.GET_SEARCH_RESULTS:
      return {
        state,
      }
    default:
      return state
    /*
        It's important to return the previous state for any unknown action.
        */
  }
}

const App = combineReducers({
  youtubeLiteView,
})

export default App
