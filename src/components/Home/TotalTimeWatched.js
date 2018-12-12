import React from "react"
import PropTypes from "prop-types"
import Typography from "@material-ui/core/Typography"
import humanizeTime from "../../modules/humanizeTime"

const TotalTimeWatched = ({ timer }) => {
  const humanizedTime = humanizeTime(timer)
  return (
    <Typography variant="display4" align="left">
      {humanizedTime}
    </Typography>
  )
}

export default TotalTimeWatched
