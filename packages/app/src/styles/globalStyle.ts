import { createGlobalStyle } from "@xstyled/styled-components"

export const GlobalStyle = createGlobalStyle`
body, html, #root {
  width: 100%;
  height: 100%;
  background: black;
}
* {
  font-family: Poppins, "Segoe UI", Roboto, "Helvetica Neue", sans-serif;
}
*:focus {
  outline:none;
}
// https://stackoverflow.com/questions/12046315/prevent-overscrolling-of-web-page
body {
  overscroll-behavior-y: none;
}
`
