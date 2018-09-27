import React from "react"
import PropTypes from "prop-types"
import YouTube from "react-youtube"
import Progress from "../Progress/Progress"
let Timer = require("easytimer.js")

class VideoPlayer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      timer: new Timer(),
      time: 0,
      ready: false,
    }
  }

  _onReady = event => {
    // onReady is only called once.
    this.setState({ ready: true })
    let self = this
    this.state.timer.addEventListener("secondsUpdated", function(e) {
      self.setState({ time: self.state.timer.getTimeValues().seconds })
      console.log(`time: ${self.state.timer.getTimeValues().seconds}`)
    })
  }

  _onPlay = event => {
    this.state.timer.start()
  }

  _onPause = event => {
    this.state.timer.pause()
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
    const { ready } = this.state
    return (
      <React.Fragment>
        <Progress isLoading={!ready} />
        <YouTube
          videoId={videoId}
          opts={opts}
          onReady={() => {
            this._onReady()
          }}
          onPlay={this._onPlay}
          onPause={this._onPause}
        />
      </React.Fragment>
    )
  }
}

VideoPlayer.propTypes = {
  videoId: PropTypes.string.isRequired,
}

export default VideoPlayer
