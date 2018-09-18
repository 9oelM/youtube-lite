import * as React from "react"
import { shallow } from "enzyme"
import renderer from "react-test-renderer"
import Drawer from "../../../components/Drawer/Drawer"
import DrawerItems from "../../../components/Drawer/DrawerItems"
import DrawerItem from "../../../components/Drawer/DrawerItem"

describe("DrawerItems", () => {
  const shallowDrawerItems = shallow(<DrawerItems />)
  it("renders multiple items", () => {
    expect(shallowDrawerItems.find(DrawerItem).length).toBeGreaterThan(1)
  })
})
