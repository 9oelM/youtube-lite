import { shallow } from "enzyme"
import React from "react"
import { ExamplePure } from "."
describe(`ExamplePure`, () => {
  it(`should render ExamplePure component without error`, () => {
    expect(() => shallow(<ExamplePure color={`#FFF333`} />)).not.toThrow()
  })
})
