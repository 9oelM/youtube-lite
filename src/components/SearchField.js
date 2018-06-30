import React, { Component } from 'react'
import YoutubeAutocomplete from 'material-ui-youtube-autocomplete'
import apiData from '../static/apiData'

class SearchField extends Component {
  render() {
    return (
      <YoutubeAutocomplete
        apiKey={apiData.API_KEY}        // you must get an API key from google if you want video search results returned
        maxResults={"20"}    // defaults -> 50. Number of video search results you want
        placeHolder={"Search Youtube"}   // defaults -> "Search Youtube"
        callback={this.showResults}    // callback to execute when search results are retrieved
        className = "search-field"     // defaults -> random string
      />
    );
  }
  
  showResults(results) {
    console.log(results)
  }
}

export default SearchField;
