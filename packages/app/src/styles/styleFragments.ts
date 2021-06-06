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

// variants
export const V = {
  buttons: {
    primary: {
      bg: { _: `background`, hover: `accent` },
      color: { _: `accent`, hover: `background` },
      borderRadius: `lg`,
      padding: { _: 1.5 },
      borderColor: { _: `accent`, hover: `` },
      borderWidth: { _: 2 },
      transition: `all 0.3s`,
    },
  },
}
