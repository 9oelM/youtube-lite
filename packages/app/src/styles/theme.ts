import { Theme } from "theme-ui"

// https://theme-ui.com/guides/typescript#exact-theme-type
const makeTheme = <T extends Theme>(t: T) => t

export const theme = makeTheme({
  colors: {
    background: `white`,
    text: `black`,
    blue: {
      light: `#187abf`,
      dark: `#235a97`,
    },
  },
})

export type ExactTheme = typeof theme
