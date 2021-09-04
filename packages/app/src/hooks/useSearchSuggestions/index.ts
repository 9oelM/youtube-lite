import { push } from "connected-react-router"
import { useState, useMemo, useCallback } from "react"
import { useDispatch } from "react-redux"

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function useSearchSuggestions({
  searchKeyword,
  setSuggestionsOpenFalse,
  setSuggestionsOpenTrue,
}: {
  searchKeyword: string
  setSuggestionsOpenFalse: VoidFunction
  setSuggestionsOpenTrue: VoidFunction
}) {
  const dispatch = useDispatch()

  const [currentFocusedSuggestionIndex, setCurrentFocusedSuggestionIndex] =
    useState<Readonly<null | number>>(null)
  const [searchSuggestions, setSearchSuggestions] = useState<string[]>([])

  const onSetSearchSuggestions = useMemo(() => setSearchSuggestions, [])
  const onSetCurrentFocusedSuggestionIndex: (next?: number | null) => void =
    useCallback((next = null) => {
      setCurrentFocusedSuggestionIndex(next)
    }, [])
  const onKeyPressSearchInput: React.KeyboardEventHandler<HTMLInputElement> =
    useCallback(
      ({ key }) => {
        if (key === `Enter`) {
          if (currentFocusedSuggestionIndex === null)
            dispatch(push(`/results?search_query=${searchKeyword}`))
          else if (currentFocusedSuggestionIndex < searchSuggestions.length) {
            dispatch(
              push(
                `/results?search_query=${searchSuggestions[currentFocusedSuggestionIndex]}`
              )
            )
            setSuggestionsOpenFalse()
          }
          return
        }
        setSuggestionsOpenTrue()

        switch (key) {
          case `ArrowDown`: {
            setCurrentFocusedSuggestionIndex((prev) => {
              return prev === null ? 1 : prev + 1
            })
            break
          }
          case `ArrowUp`: {
            setCurrentFocusedSuggestionIndex((prev) => {
              if (prev === null || searchSuggestions.length === 0) return 0

              if (prev - 1 < 0) return searchSuggestions.length - 1

              return prev - 1
            })
            break
          }
          case `Escape`: {
            onSetCurrentFocusedSuggestionIndex()
            break
          }
        }
      },
      [
        currentFocusedSuggestionIndex,
        dispatch,
        onSetCurrentFocusedSuggestionIndex,
        searchKeyword,
        searchSuggestions,
        setSuggestionsOpenFalse,
        setSuggestionsOpenTrue,
      ]
    )

  return {
    searchSuggestions,
    onKeyPressSearchInput,
    onSetSearchSuggestions,
    currentFocusedSuggestionIndex,
    onSetCurrentFocusedSuggestionIndex,
  }
}
