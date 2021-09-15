import { renderHook } from "@testing-library/react-hooks"
import { useManageVideoPlayerLook } from "./localHooks"

describe.skip(`useManageVideoPlayerLook`, () => {
  const listenCbObj: { method: VoidFunction | undefined } = {
    method: undefined,
  }
  const observeCb = jest.fn()
  const disconnectCb = jest.fn()
  // @ts-ignore
  global.ResizeObserver = class ResizeObserver {
    constructor(cb: VoidFunction) {
      listenCbObj.method = cb
    }
    observe<El extends HTMLElement>(htmlElement: El) {
      observeCb(htmlElement)
    }
    disconnect() {
      disconnectCb()
    }
  }
  it.skip(`should call onPlayerWrapperResize when playerWrapper resizes`, () => {
    expect(observeCb).toHaveBeenCalledTimes(0)
    const { result } = renderHook(() => useManageVideoPlayerLook())
    // @ts-ignore
    const listenCbSpy = jest.spyOn(listenCbObj, `method`)
    const someElement = new HTMLDivElement()
    // @ts-ignore
    result.current.playerRef.current = someElement
    someElement.dispatchEvent(new Event(`resize`))
    expect(observeCb).toHaveBeenCalledTimes(1)
    expect(listenCbSpy).toHaveBeenCalledTimes(1)
  })
})
