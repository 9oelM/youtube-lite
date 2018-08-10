import ResizeSensor from 'css-element-queries/src/ResizeSensor'

window.onload = function() {
  let TopNav = document.getElementById('TopNav')
  let ContentPage = document.getElementById('ContentPage')
  setIdenticalHeight(TopNav, ContentPage)
  new ResizeSensor(TopNav, function() {
    setIdenticalHeight(TopNav, ContentPage)
  })
}

const setIdenticalHeight = (fromElem, toElem) => {
  toElem.setAttribute('style', `padding-top: ${fromElem.clientHeight}px`)
}
