import {
  requestSearch,
  receiveSearch,
  toggleDrawer,
  addToPlaylist,
  deleteFromPlaylist,
  addPlaylist,
  deletePlaylist,
  adjustSettings,
  watchVideo,
  watchingVideo,
  startVideo,
  pauseVideo,
} from "../../actions/index"
import C from "../../actions/constants"

describe("actions", () => {
  const id = "123456789"
  const array = ["dummy", "dummy2"]
  const name = "Default"

  it("requestSearch returns an object with searchWord prop", () => {
    expect(requestSearch(name)).toEqual({
      type: C.REQUEST_SEARCH,
      searchWord: name,
    })
  })
  it("receiveSearch returns an object with searchResult prop", () => {
    expect(receiveSearch(array)).toEqual({
      type: C.RECEIVE_SEARCH,
      searchResults: array,
    })
  })
  it("toggleDrawer returns an object with isDrawerOpen prop", () => {
    expect(toggleDrawer(true)).toEqual({
      type: C.TOGGLE_DRAWER,
      isDrawerOpen: true,
    })
  })
  it("addToPlaylist returns an object with video and playlistName prop", () => {
    expect(addToPlaylist(id, name)).toEqual({
      type: C.ADD_VIDEO,
      video: id,
      playlistName: name,
    })
  })
  it("deleteFromPlaylist returns an object with videoId and playlistName", () => {
    expect(deleteFromPlaylist(id, name)).toEqual({
      type: C.DELETE_VIDEO,
      videoId: id,
      playlistName: name,
    })
  })
  it("addPlaylist returns an object with playlistName prop", () => {
    expect(addPlaylist(name)).toEqual({
      type: C.ADD_PLAYLIST,
      playlistName: name,
    })
  })
  it("deletePlaylist returns an object with playlistName prop", () => {
    expect(deletePlaylist(name)).toEqual({
      type: C.DELETE_PLAYLIST,
      playlistName: name,
    })
  })
  it("adjustSettings returns an object with settings prop", () => {
    expect(adjustSettings(array)).toEqual({
      type: C.ADJUST_SETTINGS,
      settings: array,
    })
  })
  it("watchVideo", () => {
    expect(watchVideo()).toEqual({
      type: C.WATCH_VIDEO,
    })
  })
  it("watchingVideo", () => {
    expect(watchingVideo()).toEqual({
      type: C.WATCHING_VIDEO,
    })
  })
  it("startVideo", () => {
    expect(startVideo()).toEqual({
      type: C.START_VIDEO,
    })
  })
  it("pauseVideo", () => {
    expect(pauseVideo()).toEqual({
      type: C.PAUSE_VIDEO,
    })
  })
})
