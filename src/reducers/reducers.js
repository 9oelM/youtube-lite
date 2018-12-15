import { combineReducers } from "redux"
import C from "../actions/constants"
import storage from "redux-persist/lib/storage"
import { persistReducer } from "redux-persist"

const Timer = require("easytimer.js")
const viewReducer = (
  state = {
    isDrawerOpen: false,
  },
  action
) => {
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

const searchReducer = (
  state = {
    searchResults: [], // nothing is received as a result yet
    isFetching: false,
    searchWord: "",
  },
  action
) => {
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

const playlistReducer = (
  state = {
    playlists: [
      {
        playlistName: "Default",
        videos: [],
      },
    ],
  },
  action
) => {
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

const settingsReducer = (
  state = {
    settings: {
      apiKey: "AIzaSyB8R4Bqkx25_-c58L7v1QaLReVw1FWea28",
      maxSearchResult: 15,
      showStatsBar: true,
    },
  },
  action
) => {
  switch (action.type) {
    case C.ADJUST_SETTINGS:
      return {
        ...state,
        settings: {
          apiKey: action.settings.apiKey,
          maxSearchResult: action.settings.maxSearchResult,
          showStatsBar: action.settings.showStatsBar,
        },
      }
    default:
      return state
  }
}

const videoStatsReducer = (
  state = {
    timer: new Timer(),
    time: 0,
    videoCount: 0,
  },
  action
) => {
  switch (action.type) {
    /*
     * When the user starts the video, it is ESSENTIAL that START_VIDEO fires first, then WATCHING_VIDEO.
     */
    case C.START_VIDEO: {
      let recoveredTime = 0
      let config = {}
      if (Number(state.time) > 0) {
        recoveredTime = Number(state.time)
        config = {
          startValues: {
            seconds: recoveredTime,
          },
        }
      }
      state.timer.start(config)
      return state
    }
    case C.PAUSE_VIDEO: {
      state.timer.pause()
      return state
    }
    case C.WATCH_VIDEO: {
      return {
        ...state,
        videoCount: state.videoCount + 1,
      }
    }
    // keeps track of the most updated time
    case C.WATCHING_VIDEO: {
      const elapsedTime = state.timer.getTotalTimeValues().seconds
      return {
        ...state,
        time: elapsedTime,
      }
    }
    default:
      return state
  }
}

//const persistedVideoStatsReducer =
const rootReducer = combineReducers({
  viewReducer: persistReducer(
    {
      key: "view",
      storage: storage,
    },
    viewReducer
  ),
  searchReducer,
  playlistReducer: persistReducer(
    {
      key: "playlist",
      storage: storage,
    },
    playlistReducer
  ),
  settingsReducer: persistReducer(
    {
      key: "settings",
      storage: storage,
    },
    settingsReducer
  ),
  videoStatsReducer: persistReducer(
    {
      key: "videoStats",
      storage: storage,
      whitelist: ["time", "videoCount"],
    },
    videoStatsReducer
  ),
})

export default rootReducer
