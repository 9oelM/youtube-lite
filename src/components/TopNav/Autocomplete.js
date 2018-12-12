import React from 'react'
import Downshift from 'downshift'
import PropTypes from 'prop-types'
import Input from '@material-ui/core/Input'
import Paper from '@material-ui/core/Paper'
import MenuItem from '@material-ui/core/MenuItem'
import jsonp from 'jsonp'
import shortid from 'shortid'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import blue from '@material-ui/core/colors/blue'
import searchYoutube from 'youtube-search'

class Autocomplete extends React.Component {
  constructor(props) {
    super(props)
    this.handleInputValueChange = this.handleInputValueChange.bind(this)
    this.handleItemToString = this.handleItemToString.bind(this)
    this.fetchSuggestionResults = this.fetchSuggestionResults.bind(this)
    this.fetchSearchResults = this.fetchSearchResults.bind(this)
    this.getSearchSuggestions = this.getSearchSuggestions.bind(this)
    this.handleOnSelect = this.handleOnSelect.bind(this)
    this.state = {
      inputValue: '',
      searchSuggestions: [],
      isMenuOpen: true,
    }
  }

  getSearchSuggestions(data = []) {
    let result = data.map(elem => ({
      text: elem[0],
      id: shortid.generate(),
    }))
    return [...result]
  }

  fetchSuggestionResults(query) {
    const self = this,
      googleAutoSuggestURL =
        '//suggestqueries.google.com/complete/search?client=youtube&ds=yt&q='

    jsonp(`${googleAutoSuggestURL}${query}`, function(error, data) {
      if (error && self.props.onSuggestError) {
          self.props.onSuggestError(error)
          return
      }
      let searchResult = data[1]

      self.state.searchSuggestions = self.getSearchSuggestions(searchResult)
    }) // use jsonp at your risk
  }

  fetchSearchResults(searchWord) {
    const self = this
    const {option}= this.props

    let opt = {
      maxResults: 15,
      ...option
    }

    searchYoutube(searchWord, opt, function(err, results) {
      if (err && self.props.onSearchError) {
        self.props.onSearchError(err)
        return
      }
      self.props.onSearchResults? self.props.onSearchResults(results) : ()=>{}
    })
  }

  handleInputValueChange(_inputValue) {
    this.fetchSuggestionResults(_inputValue)
    
    this.setState({ inputValue: _inputValue })
  }

  handleItemToString(item) {
    return item ? item.text : ''
  }
  
  handleOnSelect(selectedItem, stateAndHelpers){
    const { onSearchTrigger } = this.props
    this.fetchSearchResults(selectedItem.text)
    this.setState({ isMenuOpen: false })
    onSearchTrigger ? onSearchTrigger(selectedItem.text) : f=>f
  }

  render() {
    const { searchSuggestions, isMenuOpen } = this.state
    const {
      useMui = true,
      inputId = 'youtube-autocomplete-input',
      menuId = 'youtube-autocomplete-menu',
      itemClassName = 'youtube-autocomplete-items',
      theme = createMuiTheme({
        primary: blue,
      }),
      placeholderText = 'Search youtube',
      onSearchTrigger
    } = this.props

    return (
      <div 
        id="youtube-autocomplete">
      <Downshift
        onInputValueChange={this.handleInputValueChange}
        itemToString={this.handleItemToString}
        isOpen={isMenuOpen}
        onSelect={this.handleOnSelect}
      >
        {({ getInputProps, getItemProps, getMenuProps, isOpen, onKeyDown }) => (
          <div>
            {useMui ? (
              <MuiThemeProvider theme={theme}>
                <Input
                  {...getInputProps({
                    placeholder: placeholderText,
                    fullWidth: true,
                    onKeyDown: e => {
                      this.setState({ isMenuOpen: true })
                      if (e.key === 'Enter') {
                        this.fetchSearchResults(this.state.inputValue)
                        this.setState({ isMenuOpen: false })
                        onSearchTrigger ? onSearchTrigger(this.state.inputValue) : f=>f
                      }
                    },
                  })}
                />
                {isOpen ? (
                  <Paper square {...getMenuProps()}>
                    {searchSuggestions.map((item, index) => (
                      <MenuItem
                        {...getItemProps({
                          key: item.id,
                          index,
                          item,
                          style: {
                            zIndex: 1,
                          },
                        })}
                      >
                        {item.text}
                      </MenuItem>
                    ))}
                  </Paper>
                ) : null}
              </MuiThemeProvider>
            ) : (
              <React.Fragment>
                <input
                  id={inputId}
                  {...getInputProps({
                    placeholder: placeholderText,
                    fullWidth: true,
                    onKeyDown: e => {
                      this.setState({ isMenuOpen: true })
                      if (e.key === 'Enter') {
                        this.fetchSearchResults(this.state.inputValue)
                        this.setState({ isMenuOpen: false })
                        onSearchTrigger ? onSearchTrigger(this.state.inputValue) : f=>f
                      }
                    },
                  })}
                />
                {isOpen ? (
                  <div id={menuId} {...getMenuProps()}>
                    {searchSuggestions.map((item, index) => (
                      <div
                        className={itemClassName}
                        {...getItemProps({
                          key: item.id,
                          index,
                          item,
                          style: {
                            zIndex: 1,
                          },
                        })}
                      >
                        {item.text}
                      </div>
                    ))}
                  </div>
                ) : null}
              </React.Fragment>
            )}
          </div>
        )}
      </Downshift>
      </div>
    )
  }
}

export default Autocomplete
