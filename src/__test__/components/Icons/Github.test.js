import * as React from "react"
import { mount } from "enzyme"
import GithubIcon from "../../../components/Icons/Github"

describe("GithubIcon", () => {
  it("renders without error", () => {
    shallow(<GithubIcon />)
    mount(<GithubIcon />)
  })
})
