import React from "react"
import PropTypes from "prop-types"
import Grid from "@material-ui/core/Grid"
import ShuffleIcon from "@material-ui/icons/Shuffle"
import RepeatIcon from "@material-ui/icons/Repeat"
import RepeatOneIcon from "@material-ui/icons/RepeatOne"
import Button from "@material-ui/core/Button"
import { createMuiTheme } from "@material-ui/core/styles"
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider"

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#fff",
    },
    secondary: {
      main: "#8c8c8c",
    },
  },
})

class VideoPlayerControlButtons extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      repeatAll: false,
      shuffle: false,
    }
  }

  handleChange = key => {
    this.setState({
      [key]: !this.state[key],
    })
    this.props.onStateChange(key)
  }

  render() {
    const { shuffle, repeatAll } = this.state
    return (
      <MuiThemeProvider theme={theme}>
        <Grid style={{ width: "100%" }}>
          <Button
            className="control-button"
            onClick={() => this.handleChange("shuffle")}
            color={shuffle ? "default" : "secondary"}
          >
            <ShuffleIcon />
          </Button>
          <Button
            className="control-button"
            onClick={() => this.handleChange("repeatAll")}
            color="default"
          >
            {repeatAll ? <RepeatIcon /> : <RepeatOneIcon />}
          </Button>
        </Grid>
      </MuiThemeProvider>
    )
  }
}

export default VideoPlayerControlButtons
