import React from 'react'
import YouTube from 'react-youtube'
import Paper from '@material-ui/core/Paper'

class VideoPlayer extends React.Component {
  render() {
    const opts = {
      height: '100%',
      width: '100%',
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 1,
      },
    }
    const { videoId } = this.props

    return (
      <Paper
        style={{
          width: '100%',
          height: '100%',
        }}
      >
        <YouTube videoId={videoId} opts={opts} onReady={this._onReady} />
      </Paper>
    )
  }

  _onReady(event) {
    // access to player in all event handlers via event.target
    event.target.pauseVideo()
  }
}

export default VideoPlayer
