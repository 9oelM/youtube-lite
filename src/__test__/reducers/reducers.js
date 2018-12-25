import { createStore } from "redux"
import rootReducer from "../../reducers/reducers"
import C from "../../actions/constants"
import { toggleDrawer, requestSearch, receiveSearch } from "../../actions/index"

describe("Store", () => {
  it("should handle toggleDrawer action", () => {
    const store = createStore(rootReducer, {})
    const actionContent = { isDrawerOpen: true }
    const action = toggleDrawer(actionContent)
    store.dispatch(action)
    const actual = store.getState().viewReducer
    const expected = { isDrawerOpen: true }
    expect(actual).toEqual(expected)
  })
  it("should handle requestSearch action", () => {
    const store = createStore(rootReducer, {})
    const actionContent = { searchWord: "blah blah" }
    const action = requestSearch(actionContent)
    store.dispatch(action)
    const actual = store.getState().searchReducer.searchWord
    const expected = { searchWord: "blah blah" }
    expect(actual).toEqual(expected)
  })
  it("should handle receiveSearch action", () => {
    const store = createStore(rootReducer, {})
    const mockSearchResult = [
      {
        id: "t0kmvXlDBYI",
        link: "https://www.youtube.com/watch?v=t0kmvXlDBYI",
        kind: "youtube#video",
        publishedAt: "2016-02-25T09:39:05.000Z",
        channelId: "UCkz279yr_NLgqMguzVo8udw",
        channelTitle: "Hillsong Young & Free",
        title: "Real Love (Live) - Hillsong Young & Free",
        description:
          "Official video for Real Love from our sophomore album Youth Revival, recorded live in Sydney, Australia on November 13, 2005. Listen to Youth Revival on ...",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/t0kmvXlDBYI/default.jpg",
            width: 120,
            height: 90,
          },
          medium: {
            url: "https://i.ytimg.com/vi/t0kmvXlDBYI/mqdefault.jpg",
            width: 320,
            height: 180,
          },
          high: {
            url: "https://i.ytimg.com/vi/t0kmvXlDBYI/hqdefault.jpg",
            width: 480,
            height: 360,
          },
        },
      },
      {
        id: "8k2d3xIvSMg",
        link: "https://www.youtube.com/watch?v=8k2d3xIvSMg",
        kind: "youtube#video",
        publishedAt: "2018-05-25T18:44:17.000Z",
        channelId: "UCkz279yr_NLgqMguzVo8udw",
        channelTitle: "Hillsong Young & Free",
        title: "Let Go (Music Video) - Hillsong Young & Free",
        description:
          "Official music video for Let Go from our new album III. Stream the whole album right here on YouTube at http://youngandfree.co/III/youtube?IQid=youtube Listen ...",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/8k2d3xIvSMg/default.jpg",
            width: 120,
            height: 90,
          },
          medium: {
            url: "https://i.ytimg.com/vi/8k2d3xIvSMg/mqdefault.jpg",
            width: 320,
            height: 180,
          },
          high: {
            url: "https://i.ytimg.com/vi/8k2d3xIvSMg/hqdefault.jpg",
            width: 480,
            height: 360,
          },
        },
      },
      {
        id: "qEvEVALLjNQ",
        link: "https://www.youtube.com/watch?v=qEvEVALLjNQ",
        kind: "youtube#video",
        publishedAt: "2013-07-01T07:17:30.000Z",
        channelId: "UCkz279yr_NLgqMguzVo8udw",
        channelTitle: "Hillsong Young & Free",
        title: "Alive (Lyric Video) - Hillsong Young & Free",
        description:
          "Official lyric video for Alive from our debut album We Are Young & Free. Listen to We Are Young & Free on Spotify at http://smarturl.it/yandf/spotify?IQid=youtube ...",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/qEvEVALLjNQ/default.jpg",
            width: 120,
            height: 90,
          },
          medium: {
            url: "https://i.ytimg.com/vi/qEvEVALLjNQ/mqdefault.jpg",
            width: 320,
            height: 180,
          },
          high: {
            url: "https://i.ytimg.com/vi/qEvEVALLjNQ/hqdefault.jpg",
            width: 480,
            height: 360,
          },
        },
      },
      {
        id: "io2WOQ-3aVs",
        link: "https://www.youtube.com/watch?v=io2WOQ-3aVs",
        kind: "youtube#video",
        publishedAt: "2013-09-12T01:52:49.000Z",
        channelId: "UC1NZya3B-qXEm5-CRoaVaUQ",
        channelTitle: "Mallorie McGraw",
        title: "Wake (Hillsong Young and Free) lyric video",
        description:
          "I put this together with some footage I took at the youths summer camp along with using some of Hillsongs footage from their alive video! Thanks for writing such ...",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/io2WOQ-3aVs/default.jpg",
            width: 120,
            height: 90,
          },
          medium: {
            url: "https://i.ytimg.com/vi/io2WOQ-3aVs/mqdefault.jpg",
            width: 320,
            height: 180,
          },
          high: {
            url: "https://i.ytimg.com/vi/io2WOQ-3aVs/hqdefault.jpg",
            width: 480,
            height: 360,
          },
        },
      },
      {
        id: "BxQjmKoiTVQ",
        link: "https://www.youtube.com/watch?v=BxQjmKoiTVQ",
        kind: "youtube#video",
        publishedAt: "2017-08-19T04:19:14.000Z",
        channelId: "UCkz279yr_NLgqMguzVo8udw",
        channelTitle: "Hillsong Young & Free",
        title: "Love Won't Let Me Down (Music Video) - Hillsong Young & Free",
        description:
          "Official music video for Love Won't Let Me Down from our new album III. Stream the whole album right here on YouTube at http://youngandfree.co/III/youtube?",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/BxQjmKoiTVQ/default.jpg",
            width: 120,
            height: 90,
          },
          medium: {
            url: "https://i.ytimg.com/vi/BxQjmKoiTVQ/mqdefault.jpg",
            width: 320,
            height: 180,
          },
          high: {
            url: "https://i.ytimg.com/vi/BxQjmKoiTVQ/hqdefault.jpg",
            width: 480,
            height: 360,
          },
        },
      },
      {
        id: "R9LSain-Bk0",
        link: "https://www.youtube.com/watch?v=R9LSain-Bk0",
        kind: "youtube#video",
        publishedAt: "2018-06-29T19:06:15.000Z",
        channelId: "UCkz279yr_NLgqMguzVo8udw",
        channelTitle: "Hillsong Young & Free",
        title: "Every Little Thing  [Audio] - Hillsong Young & Free",
        description:
          "Official audio for Every Little Thing from our new album III. Stream the whole album right here on YouTube at http://youngandfree.co/III/youtube?IQid=youtube ...",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/R9LSain-Bk0/default.jpg",
            width: 120,
            height: 90,
          },
          medium: {
            url: "https://i.ytimg.com/vi/R9LSain-Bk0/mqdefault.jpg",
            width: 320,
            height: 180,
          },
          high: {
            url: "https://i.ytimg.com/vi/R9LSain-Bk0/hqdefault.jpg",
            width: 480,
            height: 360,
          },
        },
      },
      {
        id: "tsJEmLkphrI",
        link: "https://www.youtube.com/watch?v=tsJEmLkphrI",
        kind: "youtube#video",
        publishedAt: "2015-01-23T11:59:08.000Z",
        channelId: "UCkz279yr_NLgqMguzVo8udw",
        channelTitle: "Hillsong Young & Free",
        title:
          "This Is Living (feat. Lecrae) (Music Video) - Hillsong Young & Free",
        description:
          "Official music video for This Is Living (feat. Lecrae) from our This Is Living EP. Listen to This Is Living EP on Spotify at http://smarturl.it/ThisIsLiving/spotify?",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/tsJEmLkphrI/default.jpg",
            width: 120,
            height: 90,
          },
          medium: {
            url: "https://i.ytimg.com/vi/tsJEmLkphrI/mqdefault.jpg",
            width: 320,
            height: 180,
          },
          high: {
            url: "https://i.ytimg.com/vi/tsJEmLkphrI/hqdefault.jpg",
            width: 480,
            height: 360,
          },
        },
      },
      {
        id: "YJnjtFNsLlk",
        link: "https://www.youtube.com/watch?v=YJnjtFNsLlk",
        kind: "youtube#video",
        publishedAt: "2018-06-29T19:06:15.000Z",
        channelId: "UCkz279yr_NLgqMguzVo8udw",
        channelTitle: "Hillsong Young & Free",
        title: "Just Jesus [Audio] - Hillsong Young & Free",
        description:
          "Official audio for Just Jesus from our new album III. Stream the whole album right here on YouTube at http://youngandfree.co/III/youtube?IQid=youtube Listen to ...",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/YJnjtFNsLlk/default.jpg",
            width: 120,
            height: 90,
          },
          medium: {
            url: "https://i.ytimg.com/vi/YJnjtFNsLlk/mqdefault.jpg",
            width: 320,
            height: 180,
          },
          high: {
            url: "https://i.ytimg.com/vi/YJnjtFNsLlk/hqdefault.jpg",
            width: 480,
            height: 360,
          },
        },
      },
      {
        id: "hW_JUnAIyZg",
        link: "https://www.youtube.com/watch?v=hW_JUnAIyZg",
        kind: "youtube#video",
        publishedAt: "2017-10-30T22:22:26.000Z",
        channelId: "UCkz279yr_NLgqMguzVo8udw",
        channelTitle: "Hillsong Young & Free",
        title: "In Your Eyes (Live) - Hillsong Young & Free",
        description:
          "Recorded live in Sydney on November 13th, 2015. Our sophomore album YOUTH REVIVAL available now at: http://smarturl.it/YouthRevival?IQid=youtube ...",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/hW_JUnAIyZg/default.jpg",
            width: 120,
            height: 90,
          },
          medium: {
            url: "https://i.ytimg.com/vi/hW_JUnAIyZg/mqdefault.jpg",
            width: 320,
            height: 180,
          },
          high: {
            url: "https://i.ytimg.com/vi/hW_JUnAIyZg/hqdefault.jpg",
            width: 480,
            height: 360,
          },
        },
      },
      {
        id: "fz1vGNMvQOU",
        link: "https://www.youtube.com/watch?v=fz1vGNMvQOU",
        kind: "youtube#video",
        publishedAt: "2016-04-13T05:10:13.000Z",
        channelId: "UCkz279yr_NLgqMguzVo8udw",
        channelTitle: "Hillsong Young & Free",
        title: "Only Wanna Sing (Live) - Hillsong Young & Free",
        description:
          "Recorded live in Sydney on November 13th, 2015 Listen to Youth Revival on Spotify at http://smarturl.it/YouthRevival/spotify?IQid=youtube Get the album ...",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/fz1vGNMvQOU/default.jpg",
            width: 120,
            height: 90,
          },
          medium: {
            url: "https://i.ytimg.com/vi/fz1vGNMvQOU/mqdefault.jpg",
            width: 320,
            height: 180,
          },
          high: {
            url: "https://i.ytimg.com/vi/fz1vGNMvQOU/hqdefault.jpg",
            width: 480,
            height: 360,
          },
        },
      },
      {
        id: "e33zCUm1ZnY",
        link: "https://www.youtube.com/watch?v=e33zCUm1ZnY",
        kind: "youtube#video",
        publishedAt: "2013-08-28T11:57:02.000Z",
        channelId: "UCkz279yr_NLgqMguzVo8udw",
        channelTitle: "Hillsong Young & Free",
        title: "Wake (Live from Summercamp) - Hillsong Young & Free",
        description:
          "Official video from Hillsong Young & Free's second single, WAKE. Listen to We Are Young & Free on Spotify at http://smarturl.it/yandf/spotify?IQid=youtube Get ...",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/e33zCUm1ZnY/default.jpg",
            width: 120,
            height: 90,
          },
          medium: {
            url: "https://i.ytimg.com/vi/e33zCUm1ZnY/mqdefault.jpg",
            width: 320,
            height: 180,
          },
          high: {
            url: "https://i.ytimg.com/vi/e33zCUm1ZnY/hqdefault.jpg",
            width: 480,
            height: 360,
          },
        },
      },
      {
        id: "CQpTyVVXS2w",
        link: "https://www.youtube.com/watch?v=CQpTyVVXS2w",
        kind: "youtube#video",
        publishedAt: "2016-06-29T13:39:31.000Z",
        channelId: "UC8zN3IVya22DYMJeEp6Bx1A",
        channelTitle: "WOONIE",
        title: "Alive - Hillsong Young & Free | JONGWOOK KIM [DANCE VISUAL]",
        description:
          "Promotion Video/ JONGWOOK KIM Choreography Alive - Hillsong Young & Free Film & Edited by Gold Finger Facebook : https://www.facebook.com/jw0670 ...",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/CQpTyVVXS2w/default.jpg",
            width: 120,
            height: 90,
          },
          medium: {
            url: "https://i.ytimg.com/vi/CQpTyVVXS2w/mqdefault.jpg",
            width: 320,
            height: 180,
          },
          high: {
            url: "https://i.ytimg.com/vi/CQpTyVVXS2w/hqdefault.jpg",
            width: 480,
            height: 360,
          },
        },
      },
      {
        id: "ZFG0j23FluQ",
        link: "https://www.youtube.com/watch?v=ZFG0j23FluQ",
        kind: "youtube#video",
        publishedAt: "2017-08-04T04:36:44.000Z",
        channelId: "UCkz279yr_NLgqMguzVo8udw",
        channelTitle: "Hillsong Young & Free",
        title: "Love Won't Let Me Down (Lyric Video) - Hillsong Young & Free",
        description:
          "Official music video for Love Won't Let Me Down, a brand new single from Hillsong Young & Free. Listen on Spotify at: http://youngandfree.co/LWLMD?",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/ZFG0j23FluQ/default.jpg",
            width: 120,
            height: 90,
          },
          medium: {
            url: "https://i.ytimg.com/vi/ZFG0j23FluQ/mqdefault.jpg",
            width: 320,
            height: 180,
          },
          high: {
            url: "https://i.ytimg.com/vi/ZFG0j23FluQ/hqdefault.jpg",
            width: 480,
            height: 360,
          },
        },
      },
      {
        id: "-LTqLDOO31c",
        link: "https://www.youtube.com/watch?v=-LTqLDOO31c",
        kind: "youtube#video",
        publishedAt: "2018-06-29T19:06:15.000Z",
        channelId: "UCkz279yr_NLgqMguzVo8udw",
        channelTitle: "Hillsong Young & Free",
        title: "Days Gone By  [Audio] - Hillsong Young & Free",
        description:
          "Official audio for Days Gone By from our new album III. Stream the whole album right here on YouTube at http://youngandfree.co/III/youtube?IQid=youtube Listen ...",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/-LTqLDOO31c/default.jpg",
            width: 120,
            height: 90,
          },
          medium: {
            url: "https://i.ytimg.com/vi/-LTqLDOO31c/mqdefault.jpg",
            width: 320,
            height: 180,
          },
          high: {
            url: "https://i.ytimg.com/vi/-LTqLDOO31c/hqdefault.jpg",
            width: 480,
            height: 360,
          },
        },
      },
      {
        id: "Dtoi3tozG0M",
        link: "https://www.youtube.com/watch?v=Dtoi3tozG0M",
        kind: "youtube#video",
        publishedAt: "2017-10-25T17:17:50.000Z",
        channelId: "UCkz279yr_NLgqMguzVo8udw",
        channelTitle: "Hillsong Young & Free",
        title: "Trust (Live) - Hillsong Young & Free",
        description:
          "Recorded live in Sydney on November 13th, 2015. Our sophomore album YOUTH REVIVAL available now at: http://smarturl.it/YouthRevival?IQid=youtube ...",
        thumbnails: {
          default: {
            url: "https://i.ytimg.com/vi/Dtoi3tozG0M/default.jpg",
            width: 120,
            height: 90,
          },
          medium: {
            url: "https://i.ytimg.com/vi/Dtoi3tozG0M/mqdefault.jpg",
            width: 320,
            height: 180,
          },
          high: {
            url: "https://i.ytimg.com/vi/Dtoi3tozG0M/hqdefault.jpg",
            width: 480,
            height: 360,
          },
        },
      },
    ]
    const actionContent = { searchResults: mockSearchResult }
    const action = receiveSearch(actionContent)
    store.dispatch(action)
    const actual = store.getState().searchReducer.searchResults
    const expected = { searchResults: mockSearchResult }
    expect(actual).toEqual(expected)
  })
})
