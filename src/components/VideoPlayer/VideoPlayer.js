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
      ready: false,
      onWatchingVideoRefs: [],
      started: false,
    }
  }

  _onReady = event => {
    // onReady is only called once.
    const { onWatchingVideoRefs } = this.state
    const { onWatchVideo } = this.props
    onWatchVideo()
    this.setState({
      ready: true,
      onWatchingVideoRefs: [...onWatchingVideoRefs, this.onKeepWatchingVideo()],
    })
  }

  _onPauseVideo = () => {
    const { onWatchingVideoRefs } = this.state
    const { onPauseVideo } = this.props
    onPauseVideo()
    this.flushAllIntervals(onWatchingVideoRefs)
  }

  _onStartVideo = () => {
    const { onWatchingVideoRefs } = this.state
    const { onStartVideo } = this.props
    this.flushAllIntervals(onWatchingVideoRefs)
    onStartVideo()
    this.setState({
      onWatchingVideoRefs: [...onWatchingVideoRefs, this.onKeepWatchingVideo()],
    })
  }

  onKeepWatchingVideo = () => {
    const { onWatchingVideoRefs } = this.state
    const { onWatchingVideo } = this.props
    this.flushAllIntervals(onWatchingVideoRefs)
    return setInterval(() => onWatchingVideo(), 1000)
  }

  flushAllIntervals = refs => {
    refs.forEach(ref => clearInterval(ref))
  }

  componentDidMount() {
    const { onUnloadWindow } = this.props
    window.addEventListener("unload", function(event) {
      onUnloadWindow()
      console.log("unloaded")
    })
  }

  componentWillUnmount() {
    const { onWatchingVideoRefs } = this.state
    const { onPauseVideo } = this.props
    onPauseVideo()
    this.flushAllIntervals(onWatchingVideoRefs)
  }

  render() {
    const { videoId, repeatSingle } = this.props
    const { ready } = this.state
    const opts = {
      height: "95%",
      width: "100%",
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 1,
        loop: repeatSingle ? 1 : 0,
        playlist: videoId,
        rel: 0,
      },
    }
    return (
      <React.Fragment>
        <YouTube
          videoId={videoId}
          opts={opts}
          onReady={this._onReady}
          onPlay={this._onStartVideo}
          onPause={this._onPauseVideo}
          onEnd={this._onPauseVideo}
          onError={this._onPauseVideo}
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
