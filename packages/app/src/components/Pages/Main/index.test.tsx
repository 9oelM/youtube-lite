import { mount } from "enzyme"
import React from "react"
import { MainPageImpure, MainPagePure } from "src/components/Pages/Main"

jest.mock(`src/components/Normal/SearchInput`)

describe(`MainPagePure`, () => {
  it(`should mount without error`, () => {
    expect(() => {
      mount(<MainPagePure />)
    }).not.toThrow()
  })
})

describe(`MainPageImpure`, () => {
  it(`should mount without error`, () => {
    expect(() => {
      mount(<MainPageImpure />)
    }).not.toThrow()
  })
})
