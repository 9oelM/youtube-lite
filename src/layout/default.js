import React from "react"
import PropTypes from "prop-types"
import Grid from "@material-ui/core/Grid"

const defaultLayout = ({ children }) => (
  <Grid item xs={12} id="layout">
    {children}
  </Grid>
)

defaultLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
}

export default defaultLayout
