import React from "react"
import PropTypes from "prop-types"
import Typography from "@material-ui/core/Typography"
import Card from "@material-ui/core/Card"
import Paper from "@material-ui/core/Paper"
import Grid from "@material-ui/core/Grid"
import VideoPlayer from "./VideoPlayer"

const VideoPlayerPanel = ({ vId, description }) => (
  <Grid className="comfort-grid" style={{ padding: 0 }}>
    <Paper id="video-paper">
      <VideoPlayer videoId={vId} />
      <Typography variant="body1">{description}</Typography>
    </Paper>
  </Grid>
)

VideoPlayerPanel.propTypes = {
  vId: PropTypes.string.isRequired,
}

export default VideoPlayerPanel
