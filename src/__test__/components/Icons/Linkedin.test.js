import * as React from "react"
import { mount } from "enzyme"
import LinkedInIcon from "../../../components/Icons/LinkedIn"

describe("GithubIcon", () => {
  it("renders without error", () => {
    shallow(<LinkedInIcon />)
    mount(<LinkedInIcon />)
  })
})
