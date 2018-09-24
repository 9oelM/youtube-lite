import React from "react"
import PropTypes from "prop-types"
import Typography from "@material-ui/core/Typography"
import Card from "@material-ui/core/Card"
import Paper from "@material-ui/core/Paper"
import Grid from "@material-ui/core/Grid"
import ButtonBase from "@material-ui/core/ButtonBase"
import Divider from "@material-ui/core/Divider"
import AddIcon from "@material-ui/icons/PlaylistAdd"
import Drawer from "../Drawer/Drawer"
import Button from "@material-ui/core/Button"
import VideoPlayer from "./VideoPlayer"

const VideoPlayerPanel = ({ vId }) => (
  <Grid className="comfort-grid" style={{ padding: 0, height: "100%" }}>
    <Paper id="video-paper">
      <VideoPlayer videoId={vId} />
    </Paper>
  </Grid>
)

VideoPlayerPanel.propTypes = {
  vId: PropTypes.string.isRequired,
}

export default VideoPlayerPanel
