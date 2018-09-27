import React from "react"
import ReactDOM from "react-dom"
import PropTypes from "prop-types"
import YouTube from "react-youtube"
import Progress from "../Progress/Progress"
let Timer = require("easytimer.js")

const selectors = {
  frame: "#video-paper > span > iframe",
  watchMoreClipsButton: "div.ytp-pause-overlay.ytp-scroll-min",
  endScreen:
    "div.html5-endscreen.ytp-player-content.videowall-endscreen.ytp-show-tiles",
}

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
    this.handleTiming("secondsUpdated")
  }
  _onPlay = event => {
    this.state.timer.start()
  }

  _onPause = event => {
    this.state.timer.pause()
  }

  handleTiming = timeUnit => {
    let self = this
    this.state.timer.addEventListener(timeUnit, function(e) {
      self.setState({ time: self.state.timer.getTimeValues().seconds })
      console.log(`time: ${self.state.timer.getTimeValues().seconds}`)
    })
  }

  removeTemptations = (targetFrame, ...selectors) => {
    // still working on this
    const targetHtml = targetFrame.contentDocument || targetFrame.contentWindow
    console.log(targetHtml)
  }

  onNextFrame = callback => {
    // works to delay the callback to the last queue, hopefully after the render finished
    setTimeout(function() {
      window.requestAnimationFrame(callback)
    }, 0)
  }

  render() {
    const opts = {
      height: "95%",
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
        <YouTube
          ref={this.youtubeSpanElem}
          videoId={videoId}
          opts={opts}
          onReady={() => {
            this._onReady()
          }}
          onPlay={this._onPlay}
          onPause={this._onPause}
        />
        <Progress isLoading={!ready} />
      </React.Fragment>
    )
  }
}

VideoPlayer.propTypes = {
  videoId: PropTypes.string.isRequired,
}

export default VideoPlayer
