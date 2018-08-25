import React from "react"
import PropTypes from "prop-types"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemText from "@material-ui/core/ListItemText"
import SettingsIcon from "@material-ui/icons/Settings"
import DashboardIcon from "@material-ui/icons/Dashboard"
import FavBorderIcon from "@material-ui/icons/FavoriteBorder"
import { Link } from "react-router-dom"
import shortid from "shortid"

const DrawerItems = () => (
  <div>
    <List>
      {[
        ["/", "Dashboard", <DashboardIcon />],
        ["/Settings", "Settings", <SettingsIcon />],
        ["/About", "About", <FavBorderIcon />],
      ].map(item => (
        <DrawerItem key={shortid.generate()} link={item[0]} name={item[1]}>
          {item[2]}
        </DrawerItem>
      ))}
    </List>
  </div>
)

const DrawerItem = ({ link, name, children }) => (
  <ListItem button>
    <Link to={link}>
      <ListItemIcon>{children}</ListItemIcon>
      <ListItemText primary={name} />
    </Link>
  </ListItem>
)

DrawerItem.propTypes = {
  link: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
}

export default DrawerItems
