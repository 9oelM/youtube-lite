import * as React from "react"
import ReactDOM from "react-dom"
import MemoryRouter from "react-router/MemoryRouter"
import DrawerItem from "../../../components/Drawer/DrawerItem"

describe("DrawerItem", () => {
  const props = {
    link: "/settings",
    name: "Settings",
    children: <div />,
  }
  it("accepts link prop", () => {
    const node = document.createElement("div")

    ReactDOM.render(
      <MemoryRouter>
        <DrawerItem {...props} />
      </MemoryRouter>,
      node
    )

    const href = node.querySelector("a").getAttribute("href")

    expect(href).toEqual("/settings")
  })
})
