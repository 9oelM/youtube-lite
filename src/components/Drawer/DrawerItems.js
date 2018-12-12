import React from "react"
import List from "@material-ui/core/List"
import SettingsIcon from "@material-ui/icons/Settings"
import DashboardIcon from "@material-ui/icons/Dashboard"
import PlaylistIcon from "@material-ui/icons/PlaylistPlay"
import ChannelIcon from "@material-ui/icons/Tv"
import FavBorderIcon from "@material-ui/icons/FavoriteBorder"
import shortid from "shortid"
import DrawerItem from "./DrawerItem"

const DrawerItems = () => (
  <div>
    <List>
      {[
        ["/", "Dashboard", <DashboardIcon />],
        ["/Playlists", "Playlists", <PlaylistIcon />],
        //["/Channels", "Channels", <ChannelIcon />],
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

export default DrawerItems
