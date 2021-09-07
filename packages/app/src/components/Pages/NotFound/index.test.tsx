import { mount } from "enzyme"
import React from "react"
import { Provider } from "react-redux"
import {
  NotFoundPageImpure,
  NotFoundPagePure,
} from "src/components/Pages/NotFound"
import configureMockStore from "redux-mock-store"
import { getByTestId } from "src/test-utilities/utilities"
import { push } from "connected-react-router"

describe(`NotFoundPagePure`, () => {
  it(`should call onGoBackToMainPageClick prop when 'go back to main page' button is clicked`, () => {
    const mockCallBack = jest.fn()

    const notFoundPagePure = mount(
      <NotFoundPagePure onGoBackToMainPageClick={mockCallBack} />
    )
    getByTestId(notFoundPagePure, `go-back-button`).at(0).simulate(`click`)
    expect(mockCallBack.mock.calls.length).toEqual(1)
  })
})

describe(`NotFoundPageImpure`, () => {
  it(`onGoBackToMainPageClick should dispatch(push('/'))`, () => {
    const mockStore = configureMockStore()()
    const Component = () => (
      <Provider store={mockStore}>
        <NotFoundPageImpure />
      </Provider>
    )
    const wrapper = mount(<Component />)
    getByTestId(wrapper, `go-back-button`).at(0).simulate(`click`)
    expect(mockStore.getActions()).toEqual([push(expect.anything())])
  })
})
