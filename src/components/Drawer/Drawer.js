import React from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"
import Drawer from "@material-ui/core/Drawer"
import DrawerItems from "./DrawerItems"

const Drawer2 = ({ isDrawerOpen, onToggle }) => {
  return (
    <Drawer open={isDrawerOpen} anchor="left" onClose={onToggle} id="drawer">
      <div tabIndex={0} role="button" onClick={onToggle} onKeyDown={onToggle}>
        <DrawerItems />
      </div>
    </Drawer>
  )
}

export default Drawer2
