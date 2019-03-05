import * as React from "react"
import ReactDOM from "react-dom"
import { mount } from "enzyme"
import BottomNav from "../../../components/BottomNav/BottomNav"

let props = {
  settings: {
    showStatsBar: true,
  },
  time: 90,
  videoCount: 3,
}
let Nav = mount(<BottomNav {...props} />)

beforeEach(() => {
  Nav = mount(<BottomNav {...props} />)
})

describe("BottomNav", () => {
  it("componentDidMount works", () => {
    const didMount = jest.spyOn(BottomNav.prototype, "componentDidMount")
    let Nav = mount(<BottomNav {...props} />)
    expect(didMount).toHaveBeenCalledTimes(1)
  })
  it("componentWillUnmount works", () => {
    const willUnmount = jest.spyOn(BottomNav.prototype, "componentWillUnmount")
    Nav.unmount()
    expect(willUnmount).toHaveBeenCalledTimes(1)
  })
  it("has the time state made from componentDidMount", () => {
    // wait for setInterval to be invoked in 1000 milisecs
    setTimeout(() => {
      expect(Nav.state().time.length).toBeGreaterThan(0)
    }, 1100)
  })
  it("returns null if showStatsBar is false", () => {
    const newProps = { ...props, settings: { showStatsBar: false } }
    let Nav = shallow(<BottomNav {...newProps} />)
    expect(Nav.getElement()).toBe(null)
  })
  it("renders videoCount conditionally", () => {
    const videoCount = Nav.find(".bottom-nav-status").first()
    expect(videoCount.text()).toEqual(expect.stringMatching("3 videos |"))

    const newProps = { ...props, videoCount: 1 }
    let Nav2 = shallow(<BottomNav {...newProps} />)
    const videoCount2 = Nav2.find(".bottom-nav-status").first()
    expect(videoCount2.text()).toEqual(expect.stringMatching("1 video |"))
  })
  it("renders time correctly", () => {
    const time = Nav.find(".bottom-nav-status").last()
    expect(time.text()).toEqual(expect.stringMatching("1 minute, 30 seconds"))
  })
})
