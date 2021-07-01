/* istanbul ignore file */
import { Preflight } from "@xstyled/styled-components"
import React, { FC } from "react"
import { youtubeLiteTheme } from "src/styles/theme"
import { ThemeProvider } from "styled-components"

export const WithCustomTheme: FC = ({ children }) => {
  return (
    <ThemeProvider theme={youtubeLiteTheme}>
      <Preflight />
      {children}
    </ThemeProvider>
  )
}
