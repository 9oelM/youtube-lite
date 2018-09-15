import * as React from "react"
import { shallow } from "enzyme"
import renderer from "react-test-renderer"
import Drawer from "../../../components/Drawer/Drawer"

describe("Drawer component", () => {
  const shallowDrawer = shallow(
    <Drawer isDrawerOpen={true} onToggle={() => {}} />
  )
  it("renders Drawer with id", () =>
    expect(shallowDrawer.find("#drawer").length).toBe(1))
})
