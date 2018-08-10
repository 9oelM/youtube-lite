import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
const DrawerItems = () => {
  return (
    <div>
      <List>Settings</List>
      <Divider />
      <List>About</List>
    </div>
  )
}

export default DrawerItems
