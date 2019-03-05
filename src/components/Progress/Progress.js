import React from "react"
import PropTypes from "prop-types"
import LinearProgress from "@material-ui/core/LinearProgress"

const Progress = ({ isLoading }) =>
  isLoading ? (
    <LinearProgress color="secondary" className="progress-bar" />
  ) : null

Progress.propTypes = {
  isLoading: PropTypes.bool,
}

export default Progress
