import { useRef, useState, useLayoutEffect } from "react"
import ReactYoutubePlayer from "react-player/lazy"

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function useManageVideoPlayerLook() {
  const playerRef = useRef<ReactYoutubePlayer>(null)
  const [playerWrapperDimensions, setPlayerWrapperDimensions] = useState({
    width: 0,
    height: 0,
  })
  useLayoutEffect(() => {
    // @ts-ignore
    const playerWrapper: HTMLDivElement = playerRef?.current.wrapper
    function onPlayerWrapperResize() {
      setPlayerWrapperDimensions({
        width: playerWrapper.offsetWidth,
        height: playerWrapper.offsetHeight,
      })
    }
    onPlayerWrapperResize()

    const playerWrapperResizeObserver = new ResizeObserver(
      onPlayerWrapperResize
    )

    playerWrapperResizeObserver.observe(playerWrapper)

    return () => {
      playerWrapperResizeObserver.disconnect()
    }
  }, [])

  return {
    playerWrapperDimensions,
    playerRef,
  }
}
