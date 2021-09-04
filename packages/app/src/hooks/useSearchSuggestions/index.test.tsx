import React, { FC, useEffect } from "react"
import { mount } from "enzyme"
import { useSearchSuggestions } from "src/hooks/useSearchSuggestions"
import { act, renderHook } from "@testing-library/react-hooks"
import { Provider } from "react-redux"
import configureStore from "redux-mock-store"

describe(`useSearchSuggestions`, () => {
  const searchKeyword = `youtube lite`
  it(`should return variabls as expected`, () => {
    const setSuggestionsOpenFalse = jest.fn()
    const setSuggestionsOpenTrue = jest.fn()

    let output: ReturnType<typeof useSearchSuggestions> | null = null
    const MockComponent = () => {
      output = useSearchSuggestions({
        setSuggestionsOpenFalse,
        setSuggestionsOpenTrue,
        searchKeyword,
      })

      return null
    }

    mount(
      <Provider store={configureStore()()}>
        <MockComponent />
      </Provider>
    )

    expect(output).toMatchObject({
      searchSuggestions: [],
      onKeyPressSearchInput: expect.any(Function),
      onSetSearchSuggestions: expect.any(Function),
      currentFocusedSuggestionIndex: null,
      onSetCurrentFocusedSuggestionIndex: expect.any(Function),
    })
  })
  it.each([{ key: `Enter` }, { key: `A` }])(
    `#onKeyPressSearchInput should react appropriately with '$key'`,
    ({ key }) => {
      const setSuggestionsOpenFalse = jest.fn()
      const setSuggestionsOpenTrue = jest.fn()

      expect(setSuggestionsOpenTrue).toHaveBeenCalledTimes(0)

      const MockComponent = () => {
        const output = useSearchSuggestions({
          setSuggestionsOpenFalse,
          setSuggestionsOpenTrue,
          searchKeyword,
        })
        useEffect(() => {
          output?.onKeyPressSearchInput(
            // @ts-ignore
            { key }
          )
        }, [output])

        return null
      }

      mount(
        <Provider store={configureStore()()}>
          <MockComponent />
        </Provider>
      )

      switch (key) {
        case `Enter`:
          expect(setSuggestionsOpenTrue).toHaveBeenCalledTimes(0)
          break
        case `A`:
          expect(setSuggestionsOpenTrue).toHaveBeenCalledTimes(1)
          break
        default:
          throw new Error(`unrecognized key`)
      }
    }
  )

  it.each([
    {
      desc: `should not call setSuggestionsOpenFalse`,
      currentFocusedSuggestionIndex: null,
    },
    {
      desc: `should call setSuggestionsOpenFalse`,
      currentFocusedSuggestionIndex: 0,
    },
  ])(
    `$desc when currentFocusedSuggestionIndex === $currentFocusedSuggestionIndex on Enter keydown event`,
    ({ currentFocusedSuggestionIndex }) => {
      const setSuggestionsOpenFalse = jest.fn()
      const setSuggestionsOpenTrue = jest.fn()

      expect(setSuggestionsOpenFalse).toHaveBeenCalledTimes(0)

      const MockComponent = () => {
        const {
          onSetSearchSuggestions,
          onSetCurrentFocusedSuggestionIndex,
          onKeyPressSearchInput,
        } = useSearchSuggestions({
          setSuggestionsOpenFalse,
          setSuggestionsOpenTrue,
          searchKeyword,
        })

        useEffect(() => {
          if (currentFocusedSuggestionIndex !== null) {
            onSetSearchSuggestions([`test`, `test1`, `test2`])
          }
          onSetCurrentFocusedSuggestionIndex(currentFocusedSuggestionIndex)
        }, [onSetCurrentFocusedSuggestionIndex, onSetSearchSuggestions])

        useEffect(() => {
          onKeyPressSearchInput(
            // @ts-ignore
            { key: `Enter` }
          )
        }, [onKeyPressSearchInput])

        return null
      }

      mount(
        <Provider store={configureStore()()}>
          <MockComponent />
        </Provider>
      )

      switch (currentFocusedSuggestionIndex) {
        case null:
          expect(setSuggestionsOpenFalse).toHaveBeenCalledTimes(0)
          break
        case 0:
          expect(setSuggestionsOpenFalse).toHaveBeenCalledTimes(1)
          break
      }
    }
  )

  it.each([
    {
      key: `ArrowDown`,
      searchSuggestions: [],
      prevFocusedSuggestionIndex: 10,
      desc: `should increment currentFocusedSuggestionIndex by 1 if prevFocusedSuggestionIndex is NOT null`,
      expectedFocusedSuggestionIndex: 11,
    },
    {
      key: `ArrowDown`,
      searchSuggestions: [],
      prevFocusedSuggestionIndex: null,
      desc: `should set currentFocusedSuggestionIndex as 1 if prevFocusedSuggestionIndex is null`,
      expectedFocusedSuggestionIndex: 1,
    },
    {
      key: `ArrowUp`,
      searchSuggestions: [],
      prevFocusedSuggestionIndex: null,
      desc: `should set currentFocusedSuggestionIndex as 0 if prevFocusedSuggestionIndex is null`,
      expectedFocusedSuggestionIndex: 0,
    },
    {
      key: `ArrowUp`,
      searchSuggestions: [],
      prevFocusedSuggestionIndex: 1,
      desc: `should set currentFocusedSuggestionIndex as 0 if searchSuggestions.length is 0`,
      expectedFocusedSuggestionIndex: 0,
    },
    {
      key: `ArrowUp`,
      searchSuggestions: [`test1`, `test2`],
      prevFocusedSuggestionIndex: 0,
      desc: `should set currentFocusedSuggestionIndex as searchSuggestions.length - 1 if prevFocusedSuggestionIndex is 0 and searchSuggestions.length > 0`,
      expectedFocusedSuggestionIndex: 1,
    },
    {
      key: `ArrowUp`,
      searchSuggestions: [`test1`, `test2`, `test2`],
      prevFocusedSuggestionIndex: 2,
      desc: `should set currentFocusedSuggestionIndex as prevFocusedSuggestionIndex - 1 if prevFocusedSuggestionIndex > 0`,
      expectedFocusedSuggestionIndex: 1,
    },
    {
      key: `Escape`,
      searchSuggestions: [`test1`, `test2`, `test2`],
      prevFocusedSuggestionIndex: 2,
      desc: `should set currentFocusedSuggestionIndex as null`,
      expectedFocusedSuggestionIndex: null,
    },
  ])(
    `A keydown event from $key $desc`,
    ({
      key,
      prevFocusedSuggestionIndex,
      searchSuggestions,
      expectedFocusedSuggestionIndex,
    }) => {
      const wrapper: FC = ({ children }) => (
        <Provider store={configureStore()()}>{children}</Provider>
      )
      const setSuggestionsOpenFalse = jest.fn()
      const setSuggestionsOpenTrue = jest.fn()
      const { result } = renderHook(
        () =>
          useSearchSuggestions({
            setSuggestionsOpenFalse,
            setSuggestionsOpenTrue,
            searchKeyword,
          }),
        { wrapper }
      )

      act(() => {
        result.current.onSetSearchSuggestions(searchSuggestions)
        result.current.onSetCurrentFocusedSuggestionIndex(
          prevFocusedSuggestionIndex
        )
      })
      // call two separate 'act' functions because these are two distinct state updates that need to be differentiated
      // otherwise if called in the same 'act' function, it won't reflect a true result, thus leading to an error
      act(() =>
        result.current.onKeyPressSearchInput(
          // @ts-ignore
          { key }
        )
      )

      expect(result.current.currentFocusedSuggestionIndex).not.toBe(undefined)
      expect(result.current.currentFocusedSuggestionIndex).toBe(
        expectedFocusedSuggestionIndex
      )
    }
  )
})
