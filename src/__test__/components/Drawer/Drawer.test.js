import * as React from "react"
import { shallow } from "enzyme"
import Drawer from "../../../components/Drawer/Drawer"
import DrawerItems from "../../../components/Drawer/DrawerItems"

describe("Drawer", () => {
  const props = {
    isDrawerOpen: true,
    onToggle: f => f,
  }
  const shallowDrawer = shallow(<Drawer {...props} />)
  it("renders Drawer with id", () =>
    expect(shallowDrawer.find("#drawer").length).toBe(1))

  it("renders div", () => expect(shallowDrawer.find("div").length).toBe(1))

  it("renders DrawerItems", () =>
    expect(shallowDrawer.find(DrawerItems).length).toBe(1))
})
