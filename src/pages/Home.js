import React from "react"
import PropTypes from "prop-types"
import Typography from "@material-ui/core/Typography"
import Paper from "@material-ui/core/Paper"
import ContentGrid from "../layout/ContentGrid"

const Home = ({ videosWatched = "5", totalTimeWatched = "1.5 hours" }) => {
  return (
    <ContentGrid _className="home">
      <Typography variant="display1" align="left">
        You have watched
      </Typography>
      <Typography variant="display4" align="left">
        {videosWatched} videos{" "}
      </Typography>
      <Typography variant="display1" align="left">
        for
      </Typography>
      <Typography variant="display4" align="left">
        {totalTimeWatched}
      </Typography>
      <Typography variant="display1" align="left">
        over the past 24 hours.
      </Typography>
    </ContentGrid>
  )
}

Home.propTypes = {
  isEng: PropTypes.bool.isRequired,
}

export default Home
