import React from "react"
import DialogTitle from "@material-ui/core/DialogTitle"
import Dialog from "@material-ui/core/Dialog"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import Input from "@material-ui/core/Input"
import Modal from "@material-ui/core/Modal"
import Button from "@material-ui/core/Button"
import Snackbar from "@material-ui/core/Snackbar"
import IconButton from "@material-ui/core/IconButton"
import CloseIcon from "@material-ui/icons/Close"
import shortid from "shortid"

class PlaylistDialog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      inputVisible: false,
      inputValue: "",
      snackbarOpen: false,
    }
  }

  handleSnackbarClose = () => {
    this.setState({
      snackbarOpen: false,
    })
  }

  handleSnackbarOpen = () => {
    this.setState({
      snackbarOpen: true,
    })
  }

  handleChange = () => {
    this.setState({
      inputVisible: !this.state.inputVisible,
    })
  }

  handleInputChange = evt => {
    this.setState({
      inputValue: evt.target.value,
    })
  }

  render() {
    const {
      open,
      onClose,
      playlists,
      video,
      onAddToPlaylist,
      onAddPlaylist,
    } = this.props
    const { inputVisible, inputValue } = this.state
    return (
      <div style = {{maxHeight: "70%"}}>
        <Dialog onClose={onClose} open={open}>
          <DialogTitle>Playlists</DialogTitle>
          <div>
            <List>
              {playlists.map(item => (
                <ListItem
                  button
                  onClick={() => {
                    onAddToPlaylist(video, item.playlistName)
                    onClose()
                    this.handleSnackbarOpen()
                  }}
                  key={shortid.generate()}
                >
                  <ListItemText primary={item.playlistName} />
                </ListItem>
              ))}
              <ListItem button onClick={this.handleChange}>
                <ListItemText primary="Create new playlist" />
              </ListItem>
            </List>
            <Dialog open={inputVisible}>
              <DialogTitle>Create new playlist</DialogTitle>
              <List>
                <ListItem className="create-new-playlist">
                  <Input
                    placeholder="Enter name"
                    inputProps={{
                      "aria-label": "Playlist",
                    }}
                    onChange={this.handleInputChange}
                    autoFocus
                  />
                  <div className="create-new-playlist-control">
                    <Button
                      color="primary"
                      onClick={() => {
                        onAddPlaylist(inputValue)
                        this.handleChange()
                      }}
                    >
                      Add
                    </Button>
                    <Button color="secondary" onClick={this.handleChange}>
                      Cancel
                    </Button>
                  </div>
                </ListItem>
              </List>
            </Dialog>
          </div>
        </Dialog>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          open={this.state.snackbarOpen}
          autoHideDuration={6000}
          onClose={this.handleSnackbarClose}
          ContentProps={{
            "aria-describedby": "message-id",
          }}
          message={<span id="message-id">Saved to playlist</span>}
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              onClick={this.handleSnackbarClose}
            >
              <CloseIcon />
            </IconButton>,
          ]}
        />
      </div>
    )
  }
}

export default PlaylistDialog
