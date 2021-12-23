import { x } from "@xstyled/styled-components"
import React, {
  ComponentPropsWithoutRef,
  MutableRefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react"
import { FC } from "react"
import { SearchSuggestionsImpure } from "src/components/Normal/SearchInput/localFragments/SearchSuggestions"
import { SEARCH_SUGGESTIONS_DISAPPEAR_TIMEOUT_MS } from "src/constants/global"
import { useBoolean } from "src/hooks/useBoolean"
import { useSearchSuggestions } from "src/hooks/useSearchSuggestions"
import { SF, V } from "src/styles/styleFragments"
import { enhance } from "src/utilities/essentials"
import { SearchInputFallback } from "./fallback"

// eslint-disable-next-line @typescript-eslint/ban-types
export type SearchInputImpureProps = {}

export const SearchInputImpure: FC<SearchInputImpureProps> =
  enhance<SearchInputImpureProps>(() => {
    const [searchKeyword, setSearchKeyword] = useState<Readonly<string>>(``)
    const [isFocused, onSearchInputFocused, onSearchInputBlurred] =
      useBoolean(true)

    const onSearchInputChange: React.ChangeEventHandler<HTMLInputElement> =
      useCallback((e) => {
        setSearchKeyword(e.target.value)
      }, [])

    const onCutToClipboard = useCallback(() => {
      setSearchKeyword(``)
    }, [])

    const onSearchInputBlurredTimeout: MutableRefObject<null | number> =
      useRef(null)
    /**
     * this will unmount <SearchSuggestion /> and prevent redirect if blurred too quickly
     */
    const onSearchInputBlurredDelayed = useCallback(() => {
      onSearchInputBlurredTimeout.current = window.setTimeout(() => {
        onSearchInputBlurred()
      }, SEARCH_SUGGESTIONS_DISAPPEAR_TIMEOUT_MS)
    }, [onSearchInputBlurred])

    useEffect(() => {
      return () => {
        if (onSearchInputBlurredTimeout.current)
          window.clearTimeout(onSearchInputBlurredTimeout.current)
      }
    }, [])

    const {
      onKeyPressSearchInput,
      currentFocusedSuggestionIndex,
      onSetCurrentFocusedSuggestionIndex,
      onSetSearchSuggestions,
      searchSuggestions,
    } = useSearchSuggestions({
      searchKeyword,
      setSuggestionsOpenFalse: onSearchInputBlurred,
      setSuggestionsOpenTrue: onSearchInputFocused,
    })

    return (
      <x.div position={`initial`} w="100%">
        <x.section
          position="absolute"
          w={2 / 3}
          top={isFocused && searchKeyword.trim() !== `` ? `25px` : `47%`}
          transition="all 150ms"
        >
          <SearchInputPure
            {...{
              onSearchInputBlurred: onSearchInputBlurredDelayed,
              onSearchInputFocused,
              onCutToClipboard,
              searchKeyword,
              onSearchInputChange,
              onKeyPress: onKeyPressSearchInput,
            }}
          />
          {isFocused && searchKeyword.trim() !== `` ? (
            <SearchSuggestionsImpure
              {...{
                searchSuggestions,
                onSetSearchSuggestions,
                searchKeyword,
                onSetCurrentFocusedSuggestionIndex,
                currentFocusedSuggestionIndex,
              }}
            />
          ) : null}
        </x.section>
      </x.div>
    )
  })(SearchInputFallback)

// eslint-disable-next-line @typescript-eslint/ban-types
export type SearchInputPureProps = {
  searchKeyword: string
  onSearchInputBlurred?: VoidFunction
  onSearchInputFocused?: VoidFunction
  onCutToClipboard?: VoidFunction
  onSearchInputChange: React.ChangeEventHandler<HTMLInputElement>
  onKeyPress: React.KeyboardEventHandler<HTMLInputElement>
} & Partial<Pick<ComponentPropsWithoutRef<typeof x[`input`]>, `autoFocus`>>

export const SearchInputPure: FC<SearchInputPureProps> =
  enhance<SearchInputPureProps>(
    ({
      onSearchInputChange,
      searchKeyword,
      onCutToClipboard,
      onSearchInputFocused,
      onSearchInputBlurred,
      onKeyPress,
      ...xInputNativeProps
    }) => {
      return (
        <x.input
          onChange={onSearchInputChange}
          value={searchKeyword}
          {...V.inputs.primary}
          {...SF.fullWH}
          onBlur={onSearchInputBlurred}
          onFocus={onSearchInputFocused}
          onCut={onCutToClipboard}
          onKeyDown={onKeyPress}
          autoFocus
          pl={3}
          placeholder="Search Youtube"
          {...xInputNativeProps}
        />
      )
    }
  )(SearchInputFallback)
