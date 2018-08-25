import React from "react"
import PropTypes from "prop-types"
import Drawer from "@material-ui/core/Drawer"
import DrawerItems from "./DrawerItems"

const Drawer2 = ({ isDrawerOpen, onToggle }) => (
  <Drawer open={isDrawerOpen} anchor="left" onClose={onToggle} id="drawer">
    <div tabIndex={0} role="button" onClick={onToggle} onKeyDown={onToggle}>
      <DrawerItems />
    </div>
  </Drawer>
)

Drawer2.propTypes = {
  isDrawerOpen: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
}

export default Drawer2
