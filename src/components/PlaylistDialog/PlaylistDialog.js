import React from "react"
import DialogTitle from "@material-ui/core/DialogTitle"
import Dialog from "@material-ui/core/Dialog"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import shortid from "shortid"

class PlaylistDialog extends React.Component {
  handleClose = () => {
    this.props.onClose(this.props.selectedValue)
  }

  handleListItemClick = value => {
    this.props.onClose(value)
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
    return (
      <Dialog onClose={onClose} open={open}>
        <DialogTitle>Playlists</DialogTitle>
        <div>
          <List>
            {playlists.map(item => (
              <ListItem
                button
                onClick={() => {
                  onAddToPlaylist(video, item.playlistName)
                }}
                key={shortid.generate()}
              >
                <ListItemText primary={item.playlistName} />
              </ListItem>
            ))}
            <ListItem button onClick={f => f}>
              <ListItemText primary="Create new playlist" />
            </ListItem>
          </List>
        </div>
      </Dialog>
    )
  }
}

export default PlaylistDialog
