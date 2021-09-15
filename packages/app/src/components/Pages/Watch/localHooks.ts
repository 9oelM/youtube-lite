import { useState, useCallback, useEffect } from "react"
import { AsyncStatus } from "src/utilities/redux-async/asyncTypes"

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function useManageVideoPlayingStatus({
  videoIdQueryString,
}: {
  videoIdQueryString: string | null
}) {
  const [videoPlayerStatus, setVideoPlayerStatus] = useState<AsyncStatus>(
    AsyncStatus.LOADING
  )
  const onVideoPlayerReady = useCallback(() => {
    setVideoPlayerStatus(AsyncStatus.SUCCESS)
  }, [])
  const onVideoPlayerError = useCallback(() => {
    setVideoPlayerStatus(AsyncStatus.FAILURE)
  }, [])
  useEffect(() => {
    if (videoIdQueryString) return

    setVideoPlayerStatus(AsyncStatus.FAILURE)
  }, [videoIdQueryString])

  return {
    videoPlayerStatus,
    onVideoPlayerError,
    onVideoPlayerReady,
  }
}
