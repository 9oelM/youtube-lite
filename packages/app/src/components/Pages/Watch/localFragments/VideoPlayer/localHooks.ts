/* istanbul ignore file */
// seriously, too hard to test
import { useRef, useState, useLayoutEffect } from "react"
import ReactYoutubePlayer from "react-player/lazy"

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function useManageVideoPlayerLook() {
  const playerRef = useRef<ReactYoutubePlayer>(null)
  const unmountCallbackRef = useRef<VoidFunction | null>(null)
  const [playerWrapperDimensions, setPlayerWrapperDimensions] = useState({
    width: 0,
    height: 0,
  })
  useLayoutEffect(() => {
    async function manageVideoPlayerLook() {
      if (!playerRef?.current) {
        await new Promise((resolve) => {
          const i = setInterval(() => {
            if (playerRef?.current) {
              clearInterval(i)
              resolve(`done`)
            }
          }, 100)
        })
      }

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

      unmountCallbackRef.current = () => {
        playerWrapperResizeObserver.disconnect()
      }
    }

    manageVideoPlayerLook()

    return unmountCallbackRef.current ? unmountCallbackRef.current : void 0
  }, [])

  return {
    playerWrapperDimensions,
    playerRef,
  }
}
