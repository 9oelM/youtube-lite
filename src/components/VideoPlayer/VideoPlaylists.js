import React from "react"
import PropTypes from "prop-types"
import RouterPT from "react-router-prop-types"
import { withRouter } from "react-router-dom"
import ListItem from "@material-ui/core/ListItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemText from "@material-ui/core/ListItemText"
import AddIcon from "@material-ui/icons/Queue"
import PlayingIcon from "@material-ui/icons/PlaylistPlay"
import Grid from "@material-ui/core/Grid"
import shortid from "shortid"
import getCurrentPlaylist from "../../modules/getCurrentPlaylist"

const VideoPlaylists = ({
  playlists,
  match,
  location,
  history,
  onAddToPlaylist,
}) => {
  const currentPlaylist = getCurrentPlaylist(playlists, match)

  return (
    <Grid id="playlist">
      <ListItem divider>
        <ListItemIcon>
          <PlayingIcon />
        </ListItemIcon>
        <ListItemText primary={currentPlaylist.playlistName} />
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
                `/video-player/${currentPlaylist.playlistName}/${video.vId}`
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

VideoPlaylists.propTypes = {
  playlists: PropTypes.array.isRequired,
  match: RouterPT.match.isRequired,
  location: RouterPT.location.isRequired,
  history: RouterPT.history.isRequired,
  onAddToPlaylist: PropTypes.func.isRequired,
}

export default withRouter(VideoPlaylists)
