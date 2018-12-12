import React from "react"
import PropTypes from "prop-types"
import Typography from "@material-ui/core/Typography"
import Paper from "@material-ui/core/Paper"
import ContentGrid from "../layout/ContentGrid"
import {
  TotalVideosWatchedContainer,
  TotalTimeWatchedContainer,
} from "../components/Containers/index"

const Home = () => {
  return (
    <ContentGrid _className="home">
      <Typography variant="display1" align="left">
        You have watched
      </Typography>
      <TotalVideosWatchedContainer />
      <Typography variant="display1" align="left">
        for
      </Typography>
      <TotalTimeWatchedContainer />
      <Typography variant="display1" align="left">
        over the past 24 hours.
      </Typography>
    </ContentGrid>
  )
}

export default Home
