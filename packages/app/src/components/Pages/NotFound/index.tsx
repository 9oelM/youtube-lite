import React from "react"
import { FC } from "react"
import { enhance } from "src/utilities/essentials"
import { NotFoundPageFallback } from "./fallback"

// eslint-disable-next-line @typescript-eslint/ban-types
export type NotFoundPageImpureProps = {}

export const NotFoundPageImpure: FC<NotFoundPageImpureProps> =
  enhance<NotFoundPageImpureProps>(() => {
    return <NotFoundPagePure></NotFoundPagePure>
  })(NotFoundPageFallback)

// eslint-disable-next-line @typescript-eslint/ban-types
export type NotFoundPagePureProps = {}

export const NotFoundPagePure: FC<NotFoundPagePureProps> =
  enhance<NotFoundPagePureProps>(({ children }) => (
    <div>
      <p>{children}</p>
    </div>
  ))(NotFoundPageFallback)
