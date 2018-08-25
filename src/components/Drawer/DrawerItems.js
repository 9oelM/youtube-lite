import React from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"
import Drawer from "@material-ui/core/Drawer"
import List from "@material-ui/core/List"
import Divider from "@material-ui/core/Divider"
import ListItem from "@material-ui/core/ListItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemText from "@material-ui/core/ListItemText"
import SettingsIcon from "@material-ui/icons/Settings"

import DashboardIcon from "@material-ui/icons/Dashboard"
import FavBorderIcon from "@material-ui/icons/FavoriteBorder"
import { Link } from "react-router-dom"

const DrawerItems = () => {
  return (
    <div>
      <List>
        <ListItem button>
          <Link to="/">
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </Link>
        </ListItem>
        <ListItem button>
          <Link to="/Settings">
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </Link>
        </ListItem>
        <ListItem button>
          <Link to="/About">
            <ListItemIcon>
              <FavBorderIcon />
            </ListItemIcon>
            <ListItemText primary="About" />
          </Link>
        </ListItem>
      </List>
    </div>
  )
}

export default DrawerItems
