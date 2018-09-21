import React from "react"
import PropTypes from "prop-types"
import RouterPT from "react-router-prop-types"
import { withRouter } from "react-router-dom"
import { withStyles } from "@material-ui/core/styles"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"

const BottomNav = ({ TotalVids, TotalTime }) => (
  <div id="bottom-nav">
    <AppBar id="bottom-app-bar">
      <Toolbar id="bottom-toolbar">
        <Typography
          variant="caption"
          color="inherit"
          className="bottom-nav-status"
        >
          Videos watched: {5}
          &nbsp;| &nbsp;
        </Typography>
        <Typography
          variant="caption"
          color="inherit"
          className="bottom-nav-status"
        >
          Total time watched: {"1.5 hr"}
        </Typography>
      </Toolbar>
    </AppBar>
  </div>
)

export default BottomNav
