import { createGlobalStyle } from "@xstyled/styled-components"

export const GlobalStyle = createGlobalStyle`
body, html, #root {
  width: 100%;
  height: 100%;
}
* {
  font-family: Poppins, "Segoe UI", Roboto, "Helvetica Neue", sans-serif;
}
button:focus {outline:0;}
`
