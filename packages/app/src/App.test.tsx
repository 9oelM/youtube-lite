import { shallow } from "enzyme"
import React from "react"
import { App } from "src/App"

describe(`App`, () => {
  it(`should mount without error`, () => {
    expect(() => shallow(<App />)).not.toThrow()
  })
})
