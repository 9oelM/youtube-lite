import React from 'react'
import VideoPlayer from './VideoPlayer'
import Card from '@material-ui/core/Card'

const videoPlayerPanel = ({ vId }) => {
  return (
    <Card>
      <VideoPlayer videoId={vId} />
    </Card>
  )
}

export default videoPlayerPanel
