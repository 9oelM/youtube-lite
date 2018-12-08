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

const SettingsLists = ({ settings }) => {
  const { showStatsBar, apiKey, maxSearchResult } = settings
  return (
    <List>
      <ListItem divider>
        <ListItemText primary="Show stats bar" />
        <ListItemSecondaryAction>
          <Switch onChange={f => f} checked={showStatsBar} color="primary" />
        </ListItemSecondaryAction>
      </ListItem>
      <ListItem divider>
        <TextField
          className="settings-text-field"
          label="API Key"
          id="api-key"
          value={apiKey}
          onChange={f => f}
          margin="normal"
          fullWidth
        />
      </ListItem>
      <ListItem divider>
        <TextField
          className="settings-text-field"
          id="max-search"
          label="Max search results"
          value={maxSearchResult}
          onChange={f => f}
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          margin="normal"
          fullWidth
        />
      </ListItem>
      <ListItem>
        <Grid container spacing={8} id="settings-button">
          <Grid item>
            <Button variant="contained" color="primary">
              Save
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" color="secondary">
              Cancel
            </Button>
          </Grid>
        </Grid>
      </ListItem>
    </List>
  )
}

SettingsLists.propTypes = {
  settings: PropTypes.shape({
    apiKey: PropTypes.string,
    maxSearchResult: PropTypes.number,
    showStatsBar: PropTypes.bool,
  }),
}

export default SettingsLists
