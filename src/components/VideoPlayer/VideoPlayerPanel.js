import React from 'react'
import VideoPlayer from './VideoPlayer'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography'

const videoPlayerPanel = ({ vId }) => {
  return (
    <Grid id="videoGrid">
      <VideoPlayer videoId={vId} />
      <Grid id="stats">
        <Card square className="statCard">
          <Typography variant="title">Videos watched</Typography>
          <Typography variant="subheading">5</Typography>
        </Card>
        <Card square className="statCard">
          <Typography variant="title">Total playing time</Typography>
          <Typography variant="subheading">1.5 hours</Typography>
        </Card>
      </Grid>
    </Grid>
  )
}

export default videoPlayerPanel
