import React from "react"
import PropTypes from "prop-types"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import humanizeTime from "../../modules/humanizeTime"

class BottomNav extends React.Component {
  // used to force refresh the component
  componentDidMount() {
    this.interval = setInterval(() => this.setState({ time: Date.now() }), 1000)
  }

  // used to prevent memory leaks!
  componentWillUnmount() {
    clearInterval(this.interval)
  }

  render() {
    const { settings, time, videoCount } = this.props
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
              {videoCount + (videoCount < 2 ? " video" : " videos")}
              &nbsp;|&nbsp;
            </Typography>
            <Typography
              variant="caption"
              color="inherit"
              className="bottom-nav-status"
            >
              {humanizeTime(time)}
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
    showStatsBar: PropTypes.bool,
  }).isRequired,
  time: PropTypes.number.isRequired,
  videoCount: PropTypes.number.isRequired,
}

export default BottomNav
