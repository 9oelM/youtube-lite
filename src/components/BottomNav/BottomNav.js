import React from "react"
import PropTypes from "prop-types"
import RouterPT from "react-router-prop-types"
import { withRouter } from "react-router-dom"
import { withStyles } from "@material-ui/core/styles"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import humanizeTime from "../../modules/humanizeTime"

class BottomNav extends React.Component {
  render() {
    const { settings, timer, videoCount } = this.props
    const humanizedTime = humanizeTime(timer)
    const { showStatsBar } = settings
    const elem = showStatsBar ? (
      <div id="bottom-nav">
        <AppBar id="bottom-app-bar">
          <Toolbar id="bottom-toolbar">
            <Typography
              variant="caption"
              color="inherit"
              className="bottom-nav-status"
            >
              {videoCount} {videoCount < 2 ? "video" : "videos"} &nbsp;|&nbsp;
            </Typography>
            <Typography
              variant="caption"
              color="inherit"
              className="bottom-nav-status"
            >
              {humanizedTime}
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
    ) : null
    return elem
  }
}

BottomNav.propTypes = {
  settings: PropTypes.shape({
    apiKey: PropTypes.string,
    maxSearchResult: PropTypes.string,
    showStatsBar: PropTypes.bool,
  }).isRequired,
}

export default BottomNav
