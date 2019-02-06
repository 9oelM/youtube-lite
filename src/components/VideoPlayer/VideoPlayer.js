import React from "react"
import ReactDOM from "react-dom"
import { withRouter } from "react-router-dom"
import PropTypes from "prop-types"
import YouTube from "react-youtube"
import Progress from "../Progress/Progress"
import getCurrentPlaylist from "../../modules/getCurrentPlaylist"
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
      opts: {
        height: "95%",
        width: "100%",
        playerVars: {
          // https://developers.google.com/youtube/player_parameters
          autoplay: 1,
          loop: 1,
          rel: 0,
          playlist: props.videoId,
        },
      },
      video: props.videoId,
    }
  }

  _onReady = event => {
    // onReady is only called once.
    // const { onWatchingVideoRefs } = this.state
    const { onWatchVideo } = this.props
    onWatchVideo()
    this.setState({
      ready: true,
      // onWatchingVideoRefs: [...onWatchingVideoRefs, this.onKeepWatchingVideo()],
      // TODO: The user cannot see the most updated time in BottomNav because onKeepWatchingVideo() will not fire until the video actually starts playin after a length of loading. In short, the user will see "0 seconds" in the bottom while the video is loading.
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

  _onEndVideo = () => {
    const { playlists, match, history, videoId } = this.props
    this._onPauseVideo()
    const currentPlaylist = getCurrentPlaylist(playlists, match)
    const nextVideoId = this.getNextVideo(currentPlaylist.videos, videoId)
    history.push({
      pathname: `/video-player/Default/${nextVideoId}`,
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

  getNextVideo = (playlistVideos, currentVideoId) => {
    const { repeatAll, shuffle } = this.props
    console.log(`repeatAll: ${repeatAll}, shuffle: ${shuffle}`)
    if (playlistVideos.length === 0) {
      console.log("!repeatAll")
      return currentVideoId
    } else if (playlistVideos.length === 1) {
      console.log("!repeatAll")
      return playlistVideos[0].vId
    } else if (playlistVideos.length > 1) {
      switch (true) {
        case !repeatAll: {
          console.log("current")
          return currentVideoId
        }
        case repeatAll && shuffle: {
          const nextRandomVideo = this.selectNextVideo(
            playlistVideos,
            currentVideoId,
            true
          )
          console.log("random:" + nextRandomVideo.vId)
          return nextRandomVideo.vId
        }
        case repeatAll && !shuffle: {
          const nextVideo = this.selectNextVideo(
            playlistVideos,
            currentVideoId,
            false
          )
          console.log("notrandom:" + nextVideo.vId)
          return nextVideo.vId
        }
        default: {
          console.log("default")
          return currentVideoId
        }
      }
    }
  }

  selectNextVideo = (playlistVideos, currentVideoId, random) => {
    if (playlistVideos.length < 2) {
      throw new Error("playlist's length should be longer than 1")
    }
    console.log("selectNExtviedo")
    if (random) {
      let done = false
      while (1) {
        const index = Math.floor(Math.random() * playlistVideos.length)
        const nextRandomVideo = playlistVideos[index]
        // Randomly selected next video is the same as the one being played right now
        console.log("inside nextRandom:" + nextRandomVideo)
        done = !(nextRandomVideo.vId == currentVideoId)
        if (done) {
          console.log("inside nextRandom:" + nextRandomVideo)
          return nextRandomVideo
        }
      }
    } else {
      const currentVideoIndex = playlistVideos.findIndex(
        video => video.vId === currentVideoId
      )
      //  If at the end, play the first video
      if (currentVideoIndex === playlistVideos.length - 1) {
        console.log(playlistVideos[0])
        return playlistVideos[0]
      }
      // otherwise play the next one
      else {
        console.log(playlistVideos[currentVideoIndex + 1])
        return playlistVideos[currentVideoIndex + 1]
      }
    }
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
    const { videoId } = this.props
    const { ready, opts } = this.state
    return (
      <React.Fragment>
        <YouTube
          videoId={videoId}
          opts={opts}
          onReady={this._onReady}
          onPlay={this._onStartVideo}
          onPause={this._onPauseVideo}
          onEnd={this._onEndVideo}
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

export default withRouter(VideoPlayer)
