import { renderHook } from "@testing-library/react-hooks"
import { act } from "react-test-renderer"
import { useManageVideoPlayingStatus } from "src/components/Pages/Watch/localHooks"
import { AsyncStatus } from "src/utilities/redux-async/asyncTypes"

describe(`useManageVideoPlayingStatus`, () => {
  it(`should return expected vars`, () => {
    const { result } = renderHook(() =>
      useManageVideoPlayingStatus({
        videoIdQueryString: `1234`,
      })
    )
    expect(result.current).toMatchObject({
      videoPlayerStatus: expect.any(String),
      onVideoPlayerError: expect.any(Function),
      onVideoPlayerReady: expect.any(Function),
    })
  })

  it.each([
    {
      cb: `onVideoPlayerReady`,
      expected: AsyncStatus.SUCCESS,
    },
    {
      cb: `onVideoPlayerError`,
      expected: AsyncStatus.FAILURE,
    },
  ])(`$cb should set AsyncStatus as $expected`, ({ cb, expected }) => {
    const { result } = renderHook(() =>
      useManageVideoPlayingStatus({
        videoIdQueryString: `1234`,
      })
    )

    switch (cb) {
      case `onVideoPlayerReady`:
        act(() => {
          result.current.onVideoPlayerReady()
        })
        break
      case `onVideoPlayerError`:
        act(() => {
          result.current.onVideoPlayerError()
        })
        break
    }
    expect(result.current.videoPlayerStatus).toBe(expected)
  })

  it(`should set AsyncStatus as FAILURE if videoIdQueryString is null`, () => {
    const { result } = renderHook(() =>
      useManageVideoPlayingStatus({
        videoIdQueryString: null,
      })
    )

    expect(result.current.videoPlayerStatus).toBe(AsyncStatus.FAILURE)
  })
})
