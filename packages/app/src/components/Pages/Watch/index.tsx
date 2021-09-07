import { x } from "@xstyled/styled-components"
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import { FC } from "react"
import { useLocation } from "react-router"
import { SF } from "src/styles/styleFragments"
import { enhance } from "src/utilities/essentials"
import { AsyncStatus } from "src/utilities/redux-async/asyncTypes"
import { WatchPageFallback } from "./fallback"
import { SearchResultPageSearchInputImpure } from "src/components/Pages/SearchResult/localFragments/SearchResultPageSearchInput"
import ReactYoutubePlayer from "react-player/lazy"
import { reactYoutubePlayerStyles } from "src/components/Pages/Watch/styles"
import { LoaderAlt } from "@styled-icons/boxicons-regular/LoaderAlt"

// eslint-disable-next-line @typescript-eslint/ban-types
export type WatchPageImpureProps = {}

export const WatchPageImpure: FC<WatchPageImpureProps> =
  enhance<WatchPageImpureProps>(() => {
    const query = new URLSearchParams(useLocation().search)
    const videoIdQueryString = query.get(`v`)
    const [videoPlayerStatus, setVideoPlayerStatus] = useState<AsyncStatus>(
      AsyncStatus.LOADING
    )

    const onVideoPlayerReady = useCallback(() => {
      setVideoPlayerStatus(AsyncStatus.SUCCESS)
    }, [])
    const onVideoPlayerError = useCallback(() => {
      setVideoPlayerStatus(AsyncStatus.FAILURE)
    }, [])

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
        {...{
          videoId: videoIdQueryString,
          playerRef,
          playerWrapperDimensions,
          onVideoPlayerError,
          onVideoPlayerReady,
          videoPlayerStatus,
        }}
      />
    )
  })(WatchPageFallback)

// eslint-disable-next-line @typescript-eslint/ban-types
export type WatchPagePureProps = {
  videoId: string
  videoPlayerStatus: AsyncStatus
  onVideoPlayerReady: VoidFunction
  onVideoPlayerError: VoidFunction
  playerRef: React.RefObject<ReactYoutubePlayer> | null
  playerWrapperDimensions: {
    width: number
    height: number
  }
}

export const WatchPagePure: FC<WatchPagePureProps> =
  enhance<WatchPagePureProps>(
    ({
      videoId,
      playerRef,
      playerWrapperDimensions,
      onVideoPlayerError,
      onVideoPlayerReady,
      videoPlayerStatus,
    }) => {
      const spinningLoaderAnimation = useMemo(
        () => (
          <x.article {...SF.flexStyles} flexDirection="column" spaceY={2}>
            <x.div
              animation="0.5s x-spin linear infinite"
              h={{
                _: `2rem`,
                md: `2.5rem`,
                lg: `3rem`,
              }}
              w={{
                _: `2rem`,
                md: `2.5rem`,
                lg: `3rem`,
              }}
            >
              <LoaderAlt height="100%" width="100%" color="text" />
            </x.div>
            <x.p color="text">Loading</x.p>
          </x.article>
        ),
        []
      )

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
            {(() => {
              switch (videoPlayerStatus) {
                case AsyncStatus.LOADING:
                  return spinningLoaderAnimation
                case AsyncStatus.FAILURE:
                  return (
                    <x.article>
                      Failed to load Youtube player due to a network problem.
                    </x.article>
                  )
                default:
                  return null
              }
            })()}
            <ReactYoutubePlayer
              // @ts-ignore
              ref={playerRef}
              onError={onVideoPlayerError}
              onReady={onVideoPlayerReady}
              config={{
                youtube: {
                  playerVars: { autoplay: 1 },
                },
              }}
              width={`66.6666666%`}
              height="60vh"
              controls
              loop
              style={{
                ...reactYoutubePlayerStyles,
                display:
                  // prevent the player from completely unmounting
                  videoPlayerStatus === AsyncStatus.SUCCESS ? `block` : `none`,
              }}
              url={`https://www.youtube.com/watch?v=${videoId}`}
            />
          </x.section>
        </x.main>
      )
    }
  )(WatchPageFallback)
