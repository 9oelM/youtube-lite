import { mount } from "enzyme"
import React from "react"
import { NotFoundPagePure } from "src/components/Pages/NotFound"

describe(`NotFoundPagePure`, () => {
  it(`should call onGoBackToMainPageClick prop when 'go back to main page' button is clicked`, () => {
    const mockCallBack = jest.fn()

    const notFoundPagePure = mount(
      <NotFoundPagePure onGoBackToMainPageClick={mockCallBack} />
    )
    notFoundPagePure
      .find(`[data-testid="go-back-button"]`)
      .at(0)
      .simulate(`click`)
    expect(mockCallBack.mock.calls.length).toEqual(1)
  })
})
