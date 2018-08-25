import React from "react"
import Grid from "@material-ui/core/Grid"
const defaultLayout = ({ children }) => {
  return (
    <Grid item xs={12} id="layout">
      {children}
    </Grid>
  )
}

export default defaultLayout
