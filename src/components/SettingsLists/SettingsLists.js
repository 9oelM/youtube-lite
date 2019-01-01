import React from "react"
import PropTypes from "prop-types"
import TextField from "@material-ui/core/TextField"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction"
import ListItemText from "@material-ui/core/ListItemText"
import Button from "@material-ui/core/Button"
import Grid from "@material-ui/core/Grid"
import Switch from "@material-ui/core/Switch"
import Snackbar from "@material-ui/core/Snackbar"
import IconButton from "@material-ui/core/IconButton"
import CloseIcon from "@material-ui/icons/Close"

/*
    SettingsLists will serve as a temp storage of the data,
    and redux will serve as a semi-permanent one.
*/

class SettingsLists extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      triggered: false,
    }
  }

  handleClick = () => {
    this.setState({ open: true })
  }

  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return
    }
    this.setState({ open: false })
  }

  handleChange = name => event => {
    const value = event.target.value
    const NumberedValue = Number(value)
    if (
      typeof NumberedValue === "number" &&
      !isNaN(NumberedValue) &&
      name === "maxSearchResult"
    ) {
      if (NumberedValue > 50 || NumberedValue < 5) {
        return
      }
    }
    name === "showStatsBar"
      ? this.setState({
          [name]: event.target.checked,
        })
      : this.setState({
          [name]: event.target.value,
        })
  }
  //         original settings
  restore = originalSettings => {
    this.setState({
      ...originalSettings,
    })
  }
  render() {
    const { settings, onAdjustSettings } = this.props
    const { triggered } = this.state
    const { showStatsBar, apiKey, maxSearchResult } = settings

    if (!triggered) {
      this.setState({
        triggered: true,
        showStatsBar,
        apiKey,
        maxSearchResult,
      })
    }

    return (
      <div>
        <List>
          <ListItem divider>
            <ListItemText primary="Delete all data in localStorage" />
            <ListItemSecondaryAction>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  window.localStorage.clear()
                  this.handleClick()
                  window.location.reload(false)
                }}
              >
                Delete
              </Button>
            </ListItemSecondaryAction>
          </ListItem>
          <ListItem divider>
            <ListItemText primary="Show stats bar" />
            <ListItemSecondaryAction>
              <Switch
                onChange={this.handleChange("showStatsBar")}
                checked={Boolean(this.state.showStatsBar)}
                color="primary"
              />
            </ListItemSecondaryAction>
          </ListItem>
          <ListItem divider>
            <TextField
              className="settings-text-field"
              label="API Key"
              id="api-key"
              value={this.state.apiKey}
              onChange={this.handleChange("apiKey")}
              InputLabelProps={{
                shrink: true,
              }}
              margin="normal"
              helperText="It is strongly advised that you get your own API key. See https://developers.google.com/youtube/v3/getting-started for the steps! For now, if you enter an invalid API key, the app's just going to crash, so be warned."
              fullWidth
            />
          </ListItem>
          <ListItem divider>
            <TextField
              className="settings-text-field"
              id="max-search"
              label="Max search results"
              value={this.state.maxSearchResult}
              onChange={this.handleChange("maxSearchResult")}
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              margin="normal"
              fullWidth
              helperText="Enter n, where 5 <= n <= 50"
            />
          </ListItem>
          <ListItem>
            <Grid container spacing={8} id="settings-button">
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    onAdjustSettings({
                      showStatsBar: this.state.showStatsBar,
                      apiKey: this.state.apiKey,
                      maxSearchResult: this.state.maxSearchResult,
                    })
                    this.handleClick()
                  }}
                >
                  Save
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() =>
                    this.restore({ showStatsBar, apiKey, maxSearchResult })
                  }
                >
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </ListItem>
        </List>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          open={this.state.open}
          autoHideDuration={6000}
          onClose={this.handleClose}
          ContentProps={{
            "aria-describedby": "message-id",
          }}
          message={<span id="message-id">Settings saved</span>}
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              onClick={this.handleClose}
            >
              <CloseIcon />
            </IconButton>,
          ]}
        />
      </div>
    )
  }
}

SettingsLists.propTypes = {
  settings: PropTypes.shape({
    apiKey: PropTypes.string,
    maxSearchResult: PropTypes.number,
    showStatsBar: PropTypes.bool,
  }).isRequired,
  onAdjustSettings: PropTypes.func.isRequired,
}

export default SettingsLists
