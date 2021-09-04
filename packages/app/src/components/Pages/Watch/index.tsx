import { x } from "@xstyled/styled-components"
import React, { useEffect, useLayoutEffect, useRef, useState } from "react"
import { FC } from "react"
import { useLocation } from "react-router"
import { SF } from "src/styles/styleFragments"
import { enhance } from "src/utilities/essentials"
import { AsyncStatus } from "src/utilities/redux-async/asyncTypes"
import { WatchPageFallback } from "./fallback"
import { SearchResultPageSearchInputImpure } from "src/components/Pages/SearchResult/localFragments/SearchResultPageSearchInput"
import ReactYoutubePlayer from "react-player/lazy"
import { reactYoutubePlayerStyles } from "src/components/Pages/Watch/styles"

// eslint-disable-next-line @typescript-eslint/ban-types
export type WatchPageImpureProps = {}

export const WatchPageImpure: FC<WatchPageImpureProps> =
  enhance<WatchPageImpureProps>(() => {
    const query = new URLSearchParams(useLocation().search)
    const videoIdQueryString = query.get(`v`)
    const [_videoPlayerStatus, setVideoPlayerStatus] = useState<AsyncStatus>(
      AsyncStatus.NOT_STARTED
    )
    const playerRef = useRef<ReactYoutubePlayer>(null)
    const [playerWrapperDimensions, setPlayerWrapperDimensions] = useState({
      width: 0,
      height: 0,
    })

    useLayoutEffect(() => {
      document.addEventListener(`click`, (e) => {
        console.log(e)
      })
      // @ts-ignore
      const playerWrapper: HTMLDivElement = playerRef?.current.wrapper
      function onPlayerWrapperResize() {
        console.log(playerWrapper.offsetWidth)
        console.log(playerWrapper.offsetHeight)
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

    useEffect(() => {
      if (videoIdQueryString) return

      setVideoPlayerStatus(AsyncStatus.FAILURE)
    }, [videoIdQueryString])

    if (!videoIdQueryString) {
      return <x.section>Failed to play video</x.section>
    }
    return (
      <WatchPagePure
        videoId={videoIdQueryString}
        playerRef={playerRef}
        playerWrapperDimensions={playerWrapperDimensions}
      />
    )
  })(WatchPageFallback)

// eslint-disable-next-line @typescript-eslint/ban-types
export type WatchPagePureProps = {
  videoId: string
  playerRef: React.RefObject<ReactYoutubePlayer> | null
  playerWrapperDimensions: {
    width: number
    height: number
  }
}

export const WatchPagePure: FC<WatchPagePureProps> =
  enhance<WatchPagePureProps>(
    ({ videoId, playerRef, playerWrapperDimensions }) => {
      return (
        <x.main
          {...SF.flexStyles}
          {...SF.fullWH}
          bg="background"
          flexDirection="column"
        >
          <x.nav position="absolute" w={2 / 3} top="25px">
            <SearchResultPageSearchInputImpure />
          </x.nav>
          <x.section {...SF.fullWH} {...SF.flexStyles}>
            <x.div
              w="70%"
              h={`60px`}
              border="1px solid transparent"
              position="absolute"
              top={`calc(50% - 25px - ${
                playerWrapperDimensions.height / 2
              }px + 27px)`}
            />
            <ReactYoutubePlayer
              // @ts-ignore
              ref={playerRef}
              width="70%"
              height="35vw"
              controls
              loop
              style={reactYoutubePlayerStyles}
              url={`https://www.youtube.com/watch?v=${videoId}`}
            />
          </x.section>
        </x.main>
      )
    }
  )(WatchPageFallback)
