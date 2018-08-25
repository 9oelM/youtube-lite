import React from "react"
import Grid from "@material-ui/core/Grid"
import Card from "./SearchResultCard.js"
import shortid from "shortid"
import Typography from "@material-ui/core/Typography"
import { withRouter } from "react-router-dom"

class SearchResultPanel extends React.Component {
  render() {
    const { searchResults, match } = this.props
    return (
      <Grid id="SearchResultPanel">
        <Grid id="SearchWord">
          <Typography variant="display1" align="center">{`Results for \"${
            match.params.searchWord
          }\"`}</Typography>
        </Grid>
        <Grid spacing={16} container justify="center">
          {searchResults.map(item => {
            return (
              <Card
                key={shortid.generate()}
                title={item.title}
                author={item.channelTitle}
                description={item.description}
                img={item.thumbnails.medium.url}
                vId={item.id}
              />
            )
          })}
        </Grid>
      </Grid>
    )
  }
}

export default withRouter(SearchResultPanel)
