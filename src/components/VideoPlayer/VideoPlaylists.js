import React from "react"
import PropTypes from "prop-types"
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
    const { playlist = ["A", "B", "C", "D"] } = this.props
    return (
      <Grid>
        <ListItem button divider>
          <ListItemIcon>
            <AddIcon />
          </ListItemIcon>
          <ListItemText primary="Add to playlist" />
        </ListItem>
        {playlist.map(video => (
          <ListItem button key={shortid.generate()}>
            {video}
          </ListItem>
        ))}
      </Grid>
    )
  }
}

export default VideoPlaylists
