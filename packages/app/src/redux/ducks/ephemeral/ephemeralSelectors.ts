import { Selector } from "react-redux"
import { RootState } from "src/redux/reducers"
import { YoutubeSearchItem } from "src/types/youtube"

export const selectYoutubeSearchResultItemFromIndex: (
  s: RootState,
  index: number
) => YoutubeSearchItem | undefined = (s, index) =>
  s.ephemeral.youtubeSearchResultItems[index]

export const selectYoutubeSearchResultItemIndices: Selector<
  RootState,
  undefined[]
> = (s) => Array.from(Array(s.ephemeral.youtubeSearchResultItems.length))
