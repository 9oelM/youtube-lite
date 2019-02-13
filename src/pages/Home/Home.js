import React from "react"
import PropTypes from "prop-types"
import Typography from "@material-ui/core/Typography"
import Paper from "@material-ui/core/Paper"
import ContentGrid from "../../layout/ContentGrid"
import {
  TotalVideosWatchedContainer,
  TotalTimeWatchedContainer,
} from "../../components/Containers/index"

const Home = () => {
  return (
    <ContentGrid _className="home">
      <Typography variant="h5" align="center">
        You have watched
      </Typography>
      <TotalVideosWatchedContainer />
      <Typography variant="h5" align="center">
        for
      </Typography>
      <TotalTimeWatchedContainer />
      <Typography variant="h5" align="center">
        over the past 24 hours.
      </Typography>
    </ContentGrid>
  )
}

export default Home
