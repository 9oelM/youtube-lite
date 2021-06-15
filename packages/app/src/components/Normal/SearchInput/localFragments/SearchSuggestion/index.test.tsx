import { mount } from "enzyme"
import React from "react"
import {
  SearchSuggestionImpure,
  SearchSuggestionPure,
} from "src/components/Normal/SearchInput/localFragments/SearchSuggestion"
import configureStore from "redux-mock-store"
import { Provider } from "react-redux"
import { push } from "connected-react-router"

describe(`SearchSuggestionPure`, () => {
  const suggestion = `youtube lite`
  const onSuggestionClick = jest.fn()
  it(`should call onSuggestionClick on click`, () => {
    expect(onSuggestionClick).toHaveBeenCalledTimes(0)
    const c = mount(
      <SearchSuggestionPure
        {...{
          suggestion,
          onSuggestionClick,
        }}
      />
    )
    c.find(`li`).simulate(`click`)
    expect(onSuggestionClick).toHaveBeenCalledTimes(1)
  })

  it(`should render raw suggestion as a text`, () => {
    const c = mount(
      <SearchSuggestionPure
        {...{
          suggestion,
          onSuggestionClick,
        }}
      />
    )
    expect(c.text()).toEqual(suggestion)
  })
})

const mockedStore = configureStore()()

describe(`SearchSuggestionImpure`, () => {
  const suggestion = `suggestION`
  it(`should dispatch push to another page`, () => {
    const c = mount(
      <Provider store={mockedStore}>
        <SearchSuggestionImpure
          {...{
            suggestion,
          }}
        />
      </Provider>
    )
    c.find(`li`).simulate(`click`)
    expect(mockedStore.getActions()).toEqual([push(expect.anything())])
    const [pushAction]: ReturnType<typeof push>[] = mockedStore.getActions()

    if (!pushAction?.payload.args) {
      fail(
        `pushAction or pushAction?.payload.args is not defined, while it should be`
      )
    }

    expect(String(pushAction.payload.args)).toContain(suggestion)
  })
})
