import React from 'react'
import Grid from '@material-ui/core/Grid'
import Card from './SearchResultCard.js'
import shortid from 'shortid'

class SearchResultPanel extends React.Component {
  render() {
    const { searchResults } = this.props
    return (
      <Grid style={{ padding: 16 }}>
        <Grid spacing={16} container justify="center">
          {searchResults.map(item => {
            return (
              <Card
                title={item.title}
                author={item.channelTitle}
                description={item.description}
                img={item.thumbnails.medium.url}
              />
            )
          })}
        </Grid>
      </Grid>
    )
  }
}

export default SearchResultPanel
