import React from 'react'
import { withRouter } from 'react-router-dom'
import VideoPlayerPanel from '../components/VideoPlayer/VideoPlayerPanel'
const VideoPlayerView = ({ match }) => {
  return <VideoPlayerPanel vId={match.params.id} />
}

export default withRouter(VideoPlayerView)
