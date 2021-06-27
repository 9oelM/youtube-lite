export type YoutubeSearchListResponse = {
  // etag: "CU7_p-re_gt-qTIxpsLYrKiajLo"
  etag: string
  items: YoutubeSearchItem[]
  // kind: "youtube#searchListResponse"
  kind: string
  // nextPageToken: "CDIQAA"
  nextPageToken: string
  // pageInfo: {totalResults: 202273, resultsPerPage: 50}
  pageInfo: { totalResults: number; resultsPerPage: number }
  // regionCode: "KR"
  regionCode: string
}

export type YoutubeSearchItem = {
  // etag: "Ul-ywnItHlbwIOh9QFySDXzBpl8"
  etag: string
  // id: {kind: "youtube#video", videoId: "4b5fqioDvn0"}
  id: { kind: string; videoId: string }
  // kind: "youtube#searchResult"
  kind: string
  snippet: {
    // publishedAt: "2021-03-19T22:00:00Z",
    publishedAt: string
    // channelId: "UCOAoyc3BS7SbClKX_Jw1qZg"
    channelId: string
    // channelTitle: "Jake Llaguno"
    channelTitle: `Jake Llaguno`
    // description: "As requested, here's the 1-hour loops of my newest song, WaifuCrush! the Anime/Weeb version of the popular song SugarCrash by ElyOtto. The original song ..."
    description: string
    // liveBroadcastContent: "none"
    liveBroadcastContent: string
    // publishTime: "2021-03-19T22:00:00Z"
    publishTime: string
    thumbnails: {
      medium: YoutubeSearchItemThumbnail
      default: YoutubeSearchItemThumbnail
      high: YoutubeSearchItemThumbnail
    }
    // title: "WaifuCrush! | [1 HOUR LOOP]
    title: string
  }
}

export type YoutubeSearchItemThumbnail = {
  // pixels
  height: number
  width: number
  url: `https://i.ytimg.com/vi/${string}/${string}.jpg`
}
