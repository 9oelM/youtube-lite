import React from "react"
import PropTypes from "prop-types"
import Typography from "@material-ui/core/Typography"

const TotalVideosWatched = ({ videoCount }) => {
  return (
    <Typography variant="display4" align="left">
      {videoCount} {videoCount < 2 ? "video" : "videos"}
    </Typography>
  )
}

export default TotalVideosWatched
