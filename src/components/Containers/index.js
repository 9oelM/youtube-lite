import React from 'react'
import TopNav from '../TopNav/TopNav'
import { connect } from 'react-redux'
import { toggleDrawer, receiveSearch, requestSearch } from '../../actions/index'

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
    },
    onSearchTrigger(searchWord) {
      dispatch(requestSearch(searchWord))
    },
  })
)(TopNav)
