import ResizeSensor from "css-element-queries/src/ResizeSensor"

const setIdenticalHeight = (fromElem, toElem) => {
  toElem.setAttribute("style", `padding-top: ${fromElem.clientHeight}px`)
}

export const setContentPagePaddingEqual = function() {
  let TopNav = document.getElementById("TopNav")
  let ContentPage = document.getElementById("ContentPage")
  setIdenticalHeight(TopNav, ContentPage)
  new ResizeSensor(TopNav, function() {
    setIdenticalHeight(TopNav, ContentPage)
  })
}
