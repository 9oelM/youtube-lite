import axios from "axios"
import { requestYoutubeSearchSuggestions } from "src/utilities/youtube"

jest.mock(`axios`)
jest.mock(`axios-jsonp`)

describe(`requestYoutubeSearchSuggestions`, () => {
  it.skip(`should return null on error`, () => {
    // @ts-ignore
    axios.get.mockImplementationOnce(
      () =>
        new Promise((_resolve, reject) => reject(new Error(`Network Error`)))
    )

    expect(requestYoutubeSearchSuggestions(`testkeyword`)).toEqual(null)
  })
  it.skip(`should return result.data[1] on no error`, () => {
    const getResult = [
      [`A`, `B`, `C`],
      [`D`, `E`, `F`],
      [`G`, `H`, `I`],
      [`J`, `K`, `L`],
    ]
    // @ts-ignore
    axios.get.mockImplementationOnce(() =>
      Promise.resolve({
        data: getResult,
      })
    )

    expect(requestYoutubeSearchSuggestions(`testkeyword`)).toStrictEqual(
      getResult[1]
    )
  })
})
