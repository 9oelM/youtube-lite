import React from "react"
import PropTypes from "prop-types"
import { withRouter } from "react-router-dom"
import Button from "@material-ui/core/Button"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemText from "@material-ui/core/ListItemText"
import ButtonBase from "@material-ui/core/ButtonBase"
import AddIcon from "@material-ui/icons/PlaylistAdd"
import Grid from "@material-ui/core/Grid"
import { withStyles } from "@material-ui/core/styles"
import shortid from "shortid"

class VideoPlaylists extends React.Component {
  render() {
    const { playlists, match, location, history, onAddToPlaylist } = this.props
    // TODO: location.state.video would be empty if an user directly comes to this page because it is passed down from onclick of SearchResultCard.
    // NOTE: To use location.state, we need to switch freem HashRouter to BrowserRouter.
    const currentPlaylistIndex = playlists.findIndex(
      elem => elem.playlistName == match.params.playlist
    )
    const currentPlaylist = playlists[currentPlaylistIndex]
    return (
      <Grid id="playlist">
        <ListItem divider>
          <ListItemText
            align="left"
            primary={`Current Playlist: ${currentPlaylist.playlistName}`}
          />
        </ListItem>
        <ListItem
          button
          divider
          onClick={() =>
            onAddToPlaylist(location.state.video, currentPlaylist.playlistName)
          }
        >
          <ListItemIcon>
            <AddIcon />
          </ListItemIcon>
          <ListItemText primary="Add to playlist" />
        </ListItem>
        <div id="playlist-container">
          {currentPlaylist.videos.map(video => (
            <ListItem
              divider
              button
              key={shortid.generate()}
              onClick={() =>
                history.push(
                  `/videoPlayerView/${currentPlaylist.playlistName}/${
                    video.vId
                  }`
                )
              }
            >
              {video.title}
            </ListItem>
          ))}
        </div>
      </Grid>
    )
  }
}

export default withRouter(VideoPlaylists)
