import React, { Component } from 'react';
import YoutubeAutocomplete from 'react-youtube-autocomplete';
import "./App.css";

class App extends Component {
  render() {
    
    const API_KEY = "AIzaSyB8R4Bqkx25_-c58L7v1QaLReVw1FWea28",
          MAX_RESULTS = "20",
          PLACEHOLDER = "Search video"
    
    return (
      <YoutubeAutocomplete
        apiKey={API_KEY}        // you must get an API key from google if you want video search results returned
        maxResults={MAX_RESULTS}    // defaults -> 50. Number of video search results you want
        placeHolder={PLACEHOLDER}   // defaults -> "Search Youtube"
        callback={this.showResults}    // callback to execute when search results are retrieved
        className = "search-field"     // defaults -> random string
      />
    );
  }
  
  showResults(results) {
    console.log(results)
  }
}

export default App;
