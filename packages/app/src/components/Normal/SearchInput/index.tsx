import { x } from "@xstyled/styled-components"
import React, { ComponentPropsWithoutRef, useCallback, useState } from "react"
import { FC } from "react"
import { SearchSuggestionsImpure } from "src/components/Normal/SearchInput/localFragments/SearchSuggestions"
import { useBoolean } from "src/hooks/useBoolean"
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

    /**
     * this will unmount <SearchSuggestion /> and prevent redirect if blurred too quickly
     */
    const onSearchInputBlurredDelayed = useCallback(() => {
      setTimeout(() => {
        onSearchInputBlurred()
      }, 50)
    }, [onSearchInputBlurred])

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
            }}
          />
          {isFocused && searchKeyword.trim() !== `` ? (
            <SearchSuggestionsImpure searchKeyword={searchKeyword} />
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
} & Partial<Pick<ComponentPropsWithoutRef<typeof x[`input`]>, `autoFocus`>>

export const SearchInputPure: FC<SearchInputPureProps> =
  enhance<SearchInputPureProps>(
    ({
      onSearchInputChange,
      searchKeyword,
      onCutToClipboard,
      onSearchInputFocused,
      onSearchInputBlurred,
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
          autoFocus
          pl={3}
          placeholder="Search Youtube"
          {...xInputNativeProps}
        />
      )
    }
  )(SearchInputFallback)
