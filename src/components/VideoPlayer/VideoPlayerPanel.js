import React from "react"
import PropTypes from "prop-types"
import Paper from "@material-ui/core/Paper"
import Grid from "@material-ui/core/Grid"
import VideoPlayerControlButtons from "./VideoPlayerControlButtons"

import {
  VideoPlaylistsContainer,
  VideoPlayerContainer,
} from "../Containers/index"

class VideoPlayerPanel extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      repeatAll: false,
      shuffle: false,
    }
  }

  onStateChange = key => {
    this.setState({
      [key]: !this.state[key],
    })
  }

  render() {
    const { vId } = this.props
    const { repeatAll, shuffle } = this.state
    return (
      <Grid className="comfort-grid" style={{ padding: 0, height: "100%" }}>
        <Paper id="video-paper">
          <Grid id="video-wrapper">
            <VideoPlayerContainer
              videoId={vId}
              repeatAll={repeatAll}
              shuffle={shuffle}
            />
            <VideoPlayerControlButtons onStateChange={this.onStateChange} />
          </Grid>
          <VideoPlaylistsContainer />
        </Paper>
      </Grid>
    )
  }
}
VideoPlayerPanel.propTypes = {
  vId: PropTypes.string.isRequired,
}

export default VideoPlayerPanel
