import React from "react"
import PropTypes from "prop-types"
import YouTube from "react-youtube"

class VideoPlayer extends React.Component {
  _onReady(event) {
    // access to player in all event handlers via event.target
    event.target.pauseVideo()
  }

  render() {
    const opts = {
      height: "100%",
      width: "100%",
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 1,
      },
    }
    const { videoId } = this.props

    return <YouTube videoId={videoId} opts={opts} onReady={this._onReady} />
  }
}

VideoPlayer.propTypes = {
  videoId: PropTypes.string.isRequired,
}

export default VideoPlayer
