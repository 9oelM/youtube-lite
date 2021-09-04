import { mount } from "enzyme"
import React from "react"
import { SearchInputPure } from "src/components/Normal/SearchInput"

describe(`SearchInputPure`, () => {
  const onSearchInputChange = jest.fn()
  const onCutToClipboard = jest.fn()
  const onSearchInputFocused = jest.fn()
  const onSearchInputBlurred = jest.fn()
  const onKeyPress = jest.fn()

  it.each([
    { callback: onSearchInputChange, event: `change` },
    { callback: onCutToClipboard, event: `cut` },
    { callback: onSearchInputFocused, event: `focus` },
    { callback: onSearchInputBlurred, event: `blur` },
    { callback: onKeyPress, event: `keydown` },
  ])(`$event event should call $callback`, ({ callback, event }) => {
    expect(callback).toHaveBeenCalledTimes(0)
    const c = mount(
      <SearchInputPure
        {...{
          searchKeyword: ``,
          onSearchInputChange,
          onCutToClipboard,
          onSearchInputFocused,
          onSearchInputBlurred,
          onKeyPress,
        }}
      />
    )
    c.find(`input`).simulate(event)
    expect(callback).toHaveBeenCalledTimes(1)
  })
})
