import React from "react"
import PropTypes from "prop-types"
import Typography from "@material-ui/core/Typography"
import TextField from "@material-ui/core/TextField"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction"
import ListItemText from "@material-ui/core/ListItemText"
import Switch from "@material-ui/core/Switch"
import Paper from "@material-ui/core/Paper"
import Button from "@material-ui/core/Button"
import Grid from "@material-ui/core/Grid"
import ContentGrid from "../layout/ContentGrid"

const Settings = ({ apiKey, maxSearchResult }) => (
  <ContentGrid _className="padBottom">
    <Paper id="settings-container">
      <Typography variant="headline">Settings</Typography>
      <List>
        <ListItem divider>
          <ListItemText primary="Show stats bar" />
          <ListItemSecondaryAction>
            <Switch onChange={f => f} checked={f => f} color="primary" />
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem divider>
          <TextField
            className="settings-text-field"
            label="API Key"
            id="api-key"
            value={"123456asd"}
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
            value={15}
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
    </Paper>
  </ContentGrid>
)

Settings.propTypes = {
  apiKey: PropTypes.string.isRequired,
  maxSearchResult: PropTypes.number.isRequired,
}

export default Settings
