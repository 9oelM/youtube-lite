import { x } from "@xstyled/styled-components"
import { ComponentPropsWithRef } from "react"

function makeStyleFragments<Keys extends string>(
  sf: Record<Keys, ComponentPropsWithRef<typeof x.div>>
): Record<Keys, ComponentPropsWithRef<typeof x.div>> {
  return sf
}

export const SF = makeStyleFragments({
  flexStyles: {
    alignItems: `center`,
    justifyContent: `center`,
    display: `flex`,
  },
})
