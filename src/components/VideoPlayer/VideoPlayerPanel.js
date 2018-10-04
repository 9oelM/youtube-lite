import React from "react"
import PropTypes from "prop-types"
import Typography from "@material-ui/core/Typography"
import Card from "@material-ui/core/Card"
import CardActions from "@material-ui/core/CardActions"
import Paper from "@material-ui/core/Paper"
import Grid from "@material-ui/core/Grid"
import ButtonBase from "@material-ui/core/ButtonBase"
import Divider from "@material-ui/core/Divider"
import AddIcon from "@material-ui/icons/PlaylistAdd"
import ShuffleIcon from "@material-ui/icons/Shuffle"
import RepeatIcon from "@material-ui/icons/Repeat"
import RepeatOneIcon from "@material-ui/icons/RepeatOne"
import Button from "@material-ui/core/Button"
import IconButton from "@material-ui/core/IconButton"
import Tabs from "@material-ui/core/Tabs"
import Tab from "@material-ui/core/Tab"
import Drawer from "../Drawer/Drawer"
import VideoPlayer from "./VideoPlayer"
import VideoPlaylists from "./VideoPlaylists"

class VideoPlayerPanel extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      repeatAll: true,
      shuffle: false,
    }
  }

  render() {
    const { vId } = this.props
    const { shuffle, repeatAll } = this.state
    return (
      <Grid className="comfort-grid" style={{ padding: 0, height: "100%" }}>
        <Paper id="video-paper">
          <Grid id="video-wrapper">
            <VideoPlayer videoId={vId} />
            <Grid style={{ width: "100%" }}>
              <Button
                className="control-button"
                onClick={() => this.setState({ shuffle: !this.state.shuffle })}
                color={shuffle ? "secondary" : "default"}
              >
                <ShuffleIcon />
              </Button>
              <Button
                className="control-button"
                onClick={() =>
                  this.setState({ repeatAll: !this.state.repeatAll })
                }
                color="secondary"
              >
                {repeatAll ? <RepeatIcon /> : <RepeatOneIcon />}
              </Button>
            </Grid>
          </Grid>
          <VideoPlaylists />
        </Paper>
      </Grid>
    )
  }
}
VideoPlayerPanel.propTypes = {
  vId: PropTypes.string.isRequired,
}

const playlist = () => (
  <Button variant="contained">
    <AddIcon /> Add to playlist
  </Button>
)
export default VideoPlayerPanel
