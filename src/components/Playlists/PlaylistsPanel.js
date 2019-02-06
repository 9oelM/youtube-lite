import React from "react"
import PropTypes from "prop-types"
import { withRouter } from "react-router-dom"
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
import ExpansionPanel from "@material-ui/core/ExpansionPanel"
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary"
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import ButtonBase from "@material-ui/core/ButtonBase"
import shortid from "shortid"

class PlaylistsPanel extends React.Component {
  render() {
    const { playlists, history } = this.props

    return (
      <React.Fragment>
        <Typography variant="headline" gutterBottom>
          Playlists
        </Typography>
        {playlists.map(elem => (
          <ExpansionPanel key={shortid.generate()}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>{elem.playlistName}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell numeric className="playlist-heading">
                      #
                    </TableCell>
                    <TableCell numeric className="playlist-heading">
                      Title
                    </TableCell>
                    <TableCell numeric className="playlist-heading">
                      Author
                    </TableCell>
                  </TableRow>
                </TableHead>
                {elem.videos.map((video, index) => (
                  <TableRow
                    hover
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      history.push(
                        `/video-player/${elem.playlistName}/${video.vId}`
                      )
                    }}
                    key={shortid.generate()}
                  >
                    <TableCell>{index}</TableCell>
                    <TableCell>{video.title}</TableCell>
                    <TableCell>{video.author}</TableCell>
                  </TableRow>
                ))}
              </Table>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        ))}
      </React.Fragment>
    )
  }
}

export default withRouter(PlaylistsPanel)
