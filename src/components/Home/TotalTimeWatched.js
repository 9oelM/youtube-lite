import React from "react"
import PropTypes from "prop-types"
import Typography from "@material-ui/core/Typography"
import humanizeTime from "../../modules/humanizeTime"

const TotalTimeWatched = ({ time }) => {
  const humanizedTime = humanizeTime(time)
  return (
    <Typography variant="h3" align="center">
      {humanizedTime}
    </Typography>
  )
}

export default TotalTimeWatched
