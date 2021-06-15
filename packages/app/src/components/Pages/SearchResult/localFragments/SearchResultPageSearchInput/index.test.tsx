import { mount } from "enzyme"
import React from "react"
import { SearchResultPageSearchInputImpure } from "src/components/Pages/SearchResult/localFragments/SearchResultPageSearchInput"
import { getByTestId } from "src/test-utilities/utilities"

jest.mock(`react-router-dom`, () => ({
  useLocation: jest.fn().mockReturnValue({
    pathname: `results`,
    search: `search_query`,
    hash: ``,
    state: null,
    key: `5nvxpbdafa`,
  }),
}))

describe(`SearchResultPageSearchInputImpure`, () => {
  it(`should show SearchSuggestions when SearchInput is focused`, () => {
    const c = mount(
      <div>
        <SearchResultPageSearchInputImpure />
      </div>
    )
    expect(getByTestId(c, `search-suggestions`).length).toEqual(0)
    c.find(`input`).simulate(`focus`)
    expect(getByTestId(c, `search-suggestions`).length).toBeGreaterThan(0)
  })
})
