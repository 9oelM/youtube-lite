import React from "react"
import { FC } from "react"
import { enhance } from "src/utilities/essentials"
import { NameFallback } from "./fallback"

// eslint-disable-next-line @typescript-eslint/ban-types
export type NameImpureProps = {}

export const NameImpure: FC<NameImpureProps> = enhance<NameImpureProps>(() => {
  return <NamePure />
})(NameFallback)

// eslint-disable-next-line @typescript-eslint/ban-types
export type NamePureProps = {}

export const NamePure: FC<NamePureProps> = enhance<NamePureProps>(() => {
  return null
})(NameFallback)
