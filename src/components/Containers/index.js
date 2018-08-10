import React from 'react'
import TopNav from '../TopNav/TopNav'
import { connect } from 'react-redux'
import { toggleDrawer } from '../../actions/index'

export const TopNavContainer = connect(
  state => ({
    isDrawerOpen: state.youtubeLiteView.isDrawerOpen,
  }),
  dispatch => ({
    onToggle() {
      dispatch(toggleDrawer())
    },
  })
)(TopNav)
