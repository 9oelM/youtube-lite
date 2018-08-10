import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import SettingsIcon from '@material-ui/icons/Settings'
import FavBorderIcon from '@material-ui/icons/FavoriteBorder'

const DrawerItems = () => {
  return (
    <div>
      <List>
        <Divider />
        <ListItem button>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItem>
        <Divider />
        <ListItem button>
          <ListItemIcon>
            <FavBorderIcon />
          </ListItemIcon>
          <ListItemText primary="About" />
        </ListItem>
        <Divider />
      </List>
    </div>
  )
}

export default DrawerItems
