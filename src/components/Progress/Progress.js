import React from "react"
import LinearProgress from "@material-ui/core/LinearProgress"

const Progress = ({ isLoading }) =>
  isLoading ? (
    <LinearProgress color="secondary" className="progress-bar" />
  ) : null

export default Progress
