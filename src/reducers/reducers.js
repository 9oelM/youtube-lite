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

const getPlaylistIndex = (playlists, action) =>
  playlists.findIndex(elem => elem.playlistName == action.playlistName)

const getVideoIndex = (playlists, playlistIndex, action) =>
  playlists[playlistIndex].videos.findIndex(elem => elem.id == action.videoId)

function playlistReducer(
  state = {
    playlists: [
      {
        playlistName: "Default",
        videos: [],
      },
    ],
  },
  action
) {
  const playlistIndex = getPlaylistIndex(state.playlists, action)
  let updatedPlaylist = [...state.playlists]
  switch (action.type) {
    case C.ADD_PLAYLIST:
      const sameNameExists = state.playlists.some(
        elem => elem.playlistName == action.playlistName
      )
      sameNameExists
        ? () => {}
        : updatedPlaylist.push({
            playlistName: action.playlistName,
            videos: [],
          })
      return {
        ...state,
        playlists: updatedPlaylist,
      }
    case C.DELETE_PLAYLIST:
      return {
        ...state,
        playlists: [...state.playlists].splice(playlistIndex, 1),
      }
    case C.ADD_VIDEO:
      // only add one unique video for a playlist
      updatedPlaylist[playlistIndex].videos.findIndex(
        elem => elem.vId == action.video.vId
      ) >= 0
        ? () => {}
        : updatedPlaylist[playlistIndex].videos.push(action.video)
      return {
        ...state,
        playlists: updatedPlaylist,
      }
    case C.DELETE_VIDEO:
      const videoIndex = getVideoIndex(state.playlists, playlistIndex, action)
      return {
        ...state,
        playlists: [...state.playlists][playlistIndex].videos.splice(
          videoIndex,
          1
        ),
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
