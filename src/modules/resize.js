import ResizeSensor from "css-element-queries/src/ResizeSensor"

const setIdenticalHeight = (fromElem, toElem) => {
  toElem.setAttribute("style", `padding-top: ${fromElem.clientHeight + 20}px`)
}

const setContentPagePaddingEqual = () => {
  const TopNav = document.getElementById("TopNav")
  const ContentPage = document.getElementById("ContentPage")
  setIdenticalHeight(TopNav, ContentPage)
  new ResizeSensor(TopNav, () => {
    setIdenticalHeight(TopNav, ContentPage)
  })
}

export default setContentPagePaddingEqual
