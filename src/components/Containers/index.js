import React from "react"
import { connect } from "react-redux"
import TopNav from "../TopNav/TopNav"
import SearchResultPanel from "../SearchResult/SearchResultPanel"
import ContentGrid from "../Layout/ContentGrid"
import { toggleDrawer, receiveSearch, requestSearch } from "../../actions/index"

export const TopNavContainer = connect(
  state => ({
    isDrawerOpen: state.viewReducer.isDrawerOpen,
  }),
  dispatch => ({
    onToggle() {
      dispatch(toggleDrawer())
    },
    onSearchResults(results) {
      dispatch(receiveSearch(results))
      console.log(results)
    },
    onSearchTrigger(searchWord) {
      dispatch(requestSearch(searchWord))
    },
  })
)(TopNav)

export const SearchResultPanelContainer = connect(
  state => ({
    searchResults: state.searchReducer.searchResults,
  }),
  null
)(SearchResultPanel)

export const ContentGridContainer = connect(
  state => ({
    isFetching: state.searchReducer.isFetching,
  }),
  null
)(ContentGrid)
