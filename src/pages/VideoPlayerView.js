import React from 'react'
import { withRouter } from 'react-router-dom'
import VideoPlayerPanel from '../components/VideoPlayer/VideoPlayerPanel'

import ContentGrid from '../layout/contentPage'
const VideoPlayerView = ({ match }) => {
  return (
    <ContentGrid>
      <VideoPlayerPanel vId={match.params.id} />
    </ContentGrid>
  )
}

export default withRouter(VideoPlayerView)
