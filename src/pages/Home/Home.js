import React from "react"
import Typography from "@material-ui/core/Typography"
import ContentGrid from "../../layout/ContentGrid"
import {
  TotalVideosWatchedContainer,
  TotalTimeWatchedContainer,
} from "../../components/Containers/index"

const Home = () => (
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

export default Home
