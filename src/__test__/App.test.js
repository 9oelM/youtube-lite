import React from "react"
import { MemoryRouter } from "react-router-dom"
import { shallow, mount } from "enzyme"
import configureMockStore from "redux-mock-store"
import { Provider } from "react-redux"
import App from "../App"
const mockStore = configureMockStore()
const initialState = {
  viewReducer: {
    isDrawerOpen: false,
    _persist: {
      version: -1,
      rehydrated: true,
    },
  },
  searchReducer: {
    searchResults: [],
    isFetching: false,
    searchWord: "",
  },
  playlistReducer: {
    playlists: [
      {
        playlistName: "Default",
        videos: [],
      },
    ],
    _persist: {
      version: -1,
      rehydrated: true,
    },
  },
  settingsReducer: {
    settings: {
      apiKey: "AIzaSyB8R4Bqkx25_-c58L7v1QaLReVw1FWea28",
      maxSearchResult: 15,
      showStatsBar: true,
    },
    _persist: {
      version: -1,
      rehydrated: true,
    },
  },
  videoStatsReducer: {
    timer: {},
    time: 0,
    videoCount: 0,
    _persist: {
      version: -1,
      rehydrated: true,
    },
  },
}
const store = mockStore(initialState)

it("renders without crashing", () => {
  shallow(<App />)
  const app = mount(
    <Provider store={store}>
      <MemoryRouter>
        <App />
      </MemoryRouter>
    </Provider>
  )
})
