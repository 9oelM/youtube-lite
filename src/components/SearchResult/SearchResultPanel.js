import React from 'react'
import Grid from '@material-ui/core/Grid'
import Card from './SearchResultCard.js'
import shortid from 'shortid'

const SearchResultPanel = ({ searchResults }) => {
  return (
    <Grid style={{ padding: 16 }}>
      <Grid spacing={16} container justify="center">
        {searchResults.map(item => {
          return (
            <Grid item key={shortid.generate()}>
              <Card
                title={item.title}
                author={item.channelTitle}
                description={item.description}
                img={item.thumbnails.medium.url}
              />
            </Grid>
          )
        })}
      </Grid>
    </Grid>
  )
}

export default SearchResultPanel
