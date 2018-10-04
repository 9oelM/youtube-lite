import React from "react"
import { withRouter } from "react-router-dom"
import PropTypes from "prop-types"
import RouterPT from "react-router-prop-types"
import Typography from "@material-ui/core/Typography"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import CardMedia from "@material-ui/core/CardMedia"
import CardActions from "@material-ui/core/CardActions"
import ButtonBase from "@material-ui/core/ButtonBase"
import IconButton from "@material-ui/core/IconButton"
import AddIcon from "@material-ui/icons/PlaylistAdd"
import Grid from "@material-ui/core/Grid"

const searchResultCard = ({
  title,
  author,
  img,
  description,
  vId,
  history,
}) => (
  <Grid className="searchResultCardWrapper">
    <ButtonBase
      className="searchResultCard"
      onClick={() => {
        history.push(`/videoPlayerView/${vId}`)
      }}
    >
      <Card square className="searchResultCardInner">
        <CardContent>
          <Typography align="left" variant="title">
            {title.length > 60 ? `${title.substring(0, 60)}...` : title}
          </Typography>
          <Typography align="left" variant="subheading">
            {`by ${author}`}
          </Typography>
        </CardContent>
        <CardMedia className="searchResultMedia" image={img} title={title} />
        <CardContent>
          <Typography align="left" variant="caption">
            {description.length > 80
              ? `${description.substring(0, 80)}...`
              : description}
          </Typography>
        </CardContent>
        <IconButton className="addToPlaylist">
          <AddIcon />
        </IconButton>
      </Card>
    </ButtonBase>
  </Grid>
)

searchResultCard.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  vId: PropTypes.string.isRequired,
  history: RouterPT.history.isRequired,
}

export default withRouter(searchResultCard)
