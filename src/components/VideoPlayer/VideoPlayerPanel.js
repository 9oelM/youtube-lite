import React from "react"
import PropTypes from "prop-types"
import Typography from "@material-ui/core/Typography"
import Card from "@material-ui/core/Card"
import Grid from "@material-ui/core/Grid"
import VideoPlayer from "./VideoPlayer"

const VideoPlayerPanel = ({ vId }) => (
  <Grid id="videoGrid">
    <VideoPlayer videoId={vId} />
    <Grid id="stats">
      <Card square className="statCard">
        <Typography variant="title">Videos watched</Typography>
        <Typography variant="subheading">5</Typography>
      </Card>
      <Card square className="statCard">
        <Typography variant="title">Total playing time</Typography>
        <Typography variant="subheading">1.5 hours</Typography>
      </Card>
    </Grid>
  </Grid>
)

VideoPlayerPanel.propTypes = {
  vId: PropTypes.string.isRequired,
}

export default VideoPlayerPanel
