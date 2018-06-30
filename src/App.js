import React, { Component } from 'react'
// components
import SearchField from './components/SearchField'
// misc
import "./styles/output/master.css"
import CssBaseline from '@material-ui/core/CssBaseline';

class App extends Component {
  render() {
    return (
      <div>
      <CssBaseline />
      <SearchField />
      </div>
    )
  }
  
  showResults(results) {
    console.log(results)
  }
}

export default App;
