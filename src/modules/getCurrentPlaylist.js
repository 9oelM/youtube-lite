const currentPlaylistIndex = (playlists, match) => {
  const currentIndex = playlists.findIndex(
    elem => elem.playlistName == match.params.playlist
  )
  return playlists[currentIndex]
}
export default currentPlaylistIndex
