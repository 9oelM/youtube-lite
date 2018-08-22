import React from 'react'
import VideoPlayer from './VideoPlayer'
import Paper from '@material-ui/core/Paper'

const videoPlayerPanel = ({ vId }) => {
  return (
    <Paper>
      <VideoPlayer videoId={vId} />
    </Paper>
  )
}

export default videoPlayerPanel
