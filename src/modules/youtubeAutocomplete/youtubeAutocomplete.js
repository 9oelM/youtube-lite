import React from 'react'
import googleAutoSuggestURL from './static'
import Downshift from 'downshift'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Input from '@material-ui/core/Input'
import es6Promise from 'es6-promise'
es6Promise.polyfill()
import isomorphicFetch from 'isomorphic-fetch'

class YoutubeAutocomplete extends React.Component {
  render() {
    return (
      <Input
        placeholder="Placeholder"
        className={classes.input}
        inputProps={{
          'aria-label': 'Description',
        }}
      />
    )
  }
}
