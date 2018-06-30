import React, { Component } from 'react'
import "./styles/output/master.css"
import SearchField from './components/SearchField'

class App extends Component {
  render() {
    return (
      <SearchField />
    )
  }
  
  showResults(results) {
    console.log(results)
  }
}

export default App;
