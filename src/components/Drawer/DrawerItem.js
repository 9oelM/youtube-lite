import React from "react"
import PropTypes from "prop-types"
import ListItem from "@material-ui/core/ListItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemText from "@material-ui/core/ListItemText"
import ButtonBase from "@material-ui/core/ButtonBase"
import { Link } from "react-router-dom"

const DrawerItem = ({ link, name, children }) => (
  <ListItem button component={Link} to={link}>
    <ListItemIcon>{children}</ListItemIcon>
    <ListItemText primary={name} />
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

export default DrawerItem
