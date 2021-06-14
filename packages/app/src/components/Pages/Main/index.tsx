import { x } from "@xstyled/styled-components"
import React from "react"
import { FC } from "react"
import { FloatingActionButtonImPure } from "src/components/Normal/FloatingActionButton"
import { SearchInputImpure } from "src/components/Normal/SearchInput"
import { SF } from "src/styles/styleFragments"
import { enhance } from "src/utilities/essentials"
// import { MainPageFallback } from "./fallback"

// eslint-disable-next-line @typescript-eslint/ban-types
export type MainPageImpureProps = {}

export const MainPageImpure: FC<MainPageImpureProps> =
  enhance<MainPageImpureProps>(() => {
    return <MainPagePure />
  })()

// eslint-disable-next-line @typescript-eslint/ban-types
export type MainPagePureProps = {}

export const MainPagePure: FC<MainPagePureProps> = enhance<MainPagePureProps>(
  () => {
    return (
      <x.main {...SF.flexStyles} {...SF.fullWH} bg="background">
        <FloatingActionButtonImPure
          menus={[
            { icon: "?", onClick: () => {} },
            { icon: "@", onClick: () => {} },
          ]}
        />
        <x.section w={2 / 3} minWidth="150px">
          <SearchInputImpure />
        </x.section>
      </x.main>
    )
  }
)()
