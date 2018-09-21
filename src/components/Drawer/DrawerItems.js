import React from "react"
import List from "@material-ui/core/List"
import SettingsIcon from "@material-ui/icons/Settings"
import DashboardIcon from "@material-ui/icons/Dashboard"
import FavBorderIcon from "@material-ui/icons/FavoriteBorder"
import shortid from "shortid"
import DrawerItem from "./DrawerItem"

const DrawerItems = () => (
  <div>
    <List>
      {[
        ["/", "Dashboard", <DashboardIcon />],
        ["/settings", "Settings", <SettingsIcon />],
        ["/about", "About", <FavBorderIcon />],
      ].map(item => (
        <DrawerItem key={shortid.generate()} link={item[0]} name={item[1]}>
          {item[2]}
        </DrawerItem>
      ))}
    </List>
  </div>
)

export default DrawerItems
