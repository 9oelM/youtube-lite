import { shallow } from "enzyme"
import React from "react"
import { Example } from "."
describe(`Example`, () => {
  it(`should render Example component without error`, () => {
    expect(() => shallow(<Example />)).not.toThrow()
  })
})
