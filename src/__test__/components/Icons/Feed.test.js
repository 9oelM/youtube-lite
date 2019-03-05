import * as React from "react"
import { mount } from "enzyme"
import FeedIcon from "../../../components/Icons/Feed"

describe("FeedIcon", () => {
  it("renders without error", () => {
    shallow(<FeedIcon />)
    mount(<FeedIcon />)
  })
})
