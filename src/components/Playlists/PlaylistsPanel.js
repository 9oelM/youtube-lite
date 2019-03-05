import React from "react"
import PropTypes from "prop-types"
import RouterPT from "react-router-prop-types"
import { withRouter } from "react-router-dom"
import Typography from "@material-ui/core/Typography"
import ExpansionPanel from "@material-ui/core/ExpansionPanel"
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary"
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import Table from "@material-ui/core/Table"
import TableCell from "@material-ui/core/TableCell"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import shortid from "shortid"

const PlaylistsPanel = ({ playlists, history }) => (
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

PlaylistsPanel.propTypes = {
  playlists: PropTypes.array.isRequired,
  history: RouterPT.history.isRequired,
}

export default withRouter(PlaylistsPanel)
