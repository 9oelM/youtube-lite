import { x } from "@xstyled/styled-components"
import React, { useMemo } from "react"
import { FC } from "react"
import { useLocation } from "react-router-dom"
import { SF } from "src/styles/styleFragments"
import { enhance } from "src/utilities/essentials"
import { AsyncStatus } from "src/utilities/redux-async/asyncTypes"
import { WatchPageFallback } from "./fallback"
import { SearchResultPageSearchInputImpure } from "src/components/Pages/SearchResult/localFragments/SearchResultPageSearchInput"
import { reactYoutubePlayerStyles } from "src/components/Pages/Watch/styles"
import { SpinningLoaderAnimationPure } from "src/components/Pages/Watch/localFragments/SpinningLoaderAnimation"
import { VideoPlayerImpure } from "src/components/Pages/Watch/localFragments/VideoPlayer"
import { reactYoutubePlayerOptions } from "src/constants/reactYoutubePlayer"
import { useManageVideoPlayingStatus } from "src/components/Pages/Watch/localHooks"
import { useDispatch } from "react-redux"
import { push } from "connected-react-router"

// eslint-disable-next-line @typescript-eslint/ban-types
export type WatchPageImpureProps = {}

export const WatchPageImpure: FC<WatchPageImpureProps> =
  enhance<WatchPageImpureProps>(() => {
    const query = new URLSearchParams(useLocation().search)
    const videoIdQueryString = query.get(`v`)
    const dispatch = useDispatch()

    const manageVideoPlayingProps = useManageVideoPlayingStatus({
      videoIdQueryString,
    })

    if (!videoIdQueryString) {
      dispatch(push(`/`))

      return <x.section>Failed to play video</x.section>
    }
    return (
      <WatchPagePure
        {...{
          videoId: videoIdQueryString,
          ...manageVideoPlayingProps,
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
}

export const WatchPagePure: FC<WatchPagePureProps> =
  enhance<WatchPagePureProps>(
    ({
      videoId,
      onVideoPlayerError,
      onVideoPlayerReady,
      videoPlayerStatus,
    }) => {
      const reactYoutubePlayerInlineStyle = useMemo(() => {
        return {
          ...reactYoutubePlayerStyles,
          display:
            // prevent the player from completely unmounting
            videoPlayerStatus === AsyncStatus.SUCCESS ? `block` : `none`,
        }
      }, [videoPlayerStatus])

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
            {(() => {
              switch (videoPlayerStatus) {
                case AsyncStatus.LOADING:
                  return <SpinningLoaderAnimationPure />
                case AsyncStatus.FAILURE:
                  return (
                    <x.article {...SF.flexStyles}>
                      Failed to load Youtube player due to a network problem.
                    </x.article>
                  )
                default:
                  return null
              }
            })()}
            <VideoPlayerImpure
              videoId={videoId}
              onError={onVideoPlayerError}
              onReady={onVideoPlayerReady}
              style={reactYoutubePlayerInlineStyle}
              config={reactYoutubePlayerOptions}
            />
          </x.section>
        </x.main>
      )
    }
  )(WatchPageFallback)
