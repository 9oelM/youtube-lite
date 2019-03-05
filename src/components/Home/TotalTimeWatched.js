import React from "react"
import PropTypes from "prop-types"
import Typography from "@material-ui/core/Typography"
import humanizeTime from "../../modules/humanizeTime"

const TotalTimeWatched = ({ time }) => (
  <Typography variant="h3" align="center">
    {humanizeTime(time)}
  </Typography>
)

TotalTimeWatched.propTypes = {
  time: PropTypes.number.isRequired,
}

export default TotalTimeWatched
