import { x } from "@xstyled/styled-components"
import React from "react"
import { FC } from "react"
import { NullFallback } from "src/components/Util/WithErrorBoundary"
import { enhance } from "src/utilities/essentials"
import ReactYoutubePlayer, { ReactPlayerProps } from "react-player/lazy"
import { useManageVideoPlayerLook } from "src/components/Pages/Watch/localFragments/VideoPlayer/localHooks"

// eslint-disable-next-line @typescript-eslint/ban-types
export type VideoPlayerImpureProps = {
  videoId: string
} & ReactPlayerProps

export const VideoPlayerImpure: FC<VideoPlayerImpureProps> =
  enhance<VideoPlayerImpureProps>(({ ...pureProps }) => {
    const manageVideoPlayerLookProps = useManageVideoPlayerLook()

    return <VideoPlayerPure {...pureProps} {...manageVideoPlayerLookProps} />
  })(NullFallback)

// eslint-disable-next-line @typescript-eslint/ban-types
export type VideoPlayerPureProps = {
  playerWrapperDimensions: {
    width: number
    height: number
  }
} & VideoPlayerImpureProps

export const VideoPlayerPure: FC<VideoPlayerPureProps> =
  enhance<VideoPlayerPureProps>(
    ({ playerWrapperDimensions, videoId, ...reactYoutubePlayerOptions }) => {
      return (
        <>
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
            width={`66.6666666%`}
            height="60vh"
            controls
            loop
            url={`https://www.youtube.com/watch?v=${videoId}`}
            {...reactYoutubePlayerOptions}
          />
        </>
      )
    }
  )(NullFallback)
