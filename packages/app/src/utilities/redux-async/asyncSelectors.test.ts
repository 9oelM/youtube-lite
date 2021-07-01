import { asyncReducer } from "src/utilities/redux-async/asyncReducer"
import {
  asyncJobByIdSelector,
  createLatestOrEarliestAsyncJobByNameSelector,
} from "src/utilities/redux-async/asyncSelectors"
import { AsyncMeta, AsyncStatus } from "src/utilities/redux-async/asyncTypes"

const name = `SEARCH_GOOGLE`
const name2 = `SEARCH_DUCKDUCKGO`
const a: AsyncMeta<typeof name, Error> = {
  id: `A`,
  status: AsyncStatus.LOADING,
  name,
  timestamp: {
    [AsyncStatus.LOADING]: 1,
  },
}
const b: AsyncMeta<typeof name, Error> = {
  id: `B`,
  status: AsyncStatus.LOADING,
  name,
  timestamp: {
    [AsyncStatus.LOADING]: 2,
  },
}
const c: AsyncMeta<typeof name, Error> = {
  id: `C`,
  status: AsyncStatus.LOADING,
  name,
  timestamp: {
    [AsyncStatus.NOT_STARTED]: 3,
    [AsyncStatus.LOADING]: 3,
  },
}
const d: AsyncMeta<typeof name, Error> = {
  id: `D`,
  status: AsyncStatus.LOADING,
  name,
  timestamp: {
    [AsyncStatus.LOADING]: 4,
  },
}
const e: AsyncMeta<typeof name2, Error> = {
  id: `E`,
  status: AsyncStatus.CANCELLED,
  name: name2,
  timestamp: {
    [AsyncStatus.LOADING]: 4,
    [AsyncStatus.CANCELLED]: 5,
  },
}
const f: AsyncMeta<typeof name, Error> = {
  id: `F`,
  status: AsyncStatus.SUCCESS,
  name,
  timestamp: {
    [AsyncStatus.NOT_STARTED]: 1,
    [AsyncStatus.LOADING]: 4,
    [AsyncStatus.SUCCESS]: 5,
  },
}
const g: AsyncMeta<typeof name, Error> = {
  id: `G`,
  status: AsyncStatus.FAILURE,
  name,
  timestamp: {
    [AsyncStatus.NOT_STARTED]: 3,
    [AsyncStatus.LOADING]: 7,
    [AsyncStatus.FAILURE]: 10,
  },
}
const h: AsyncMeta<typeof name2, Error> = {
  id: `H`,
  status: AsyncStatus.FAILURE,
  name: name2,
  timestamp: {
    [AsyncStatus.NOT_STARTED]: 10,
    [AsyncStatus.LOADING]: 11,
  },
}

const mockState: {
  async: ReturnType<typeof asyncReducer>
} = {
  async: {
    asyncJobs: {
      [a.id]: a,
      [b.id]: b,
      [c.id]: c,
      [d.id]: d,
      [e.id]: e,
      [f.id]: f,
      [g.id]: g,
      [h.id]: h,
    },
  },
}

describe(`createLatestOrEarliestAsyncJobByNameSelector`, () => {
  const earliestAsyncJobByNameSelector =
    createLatestOrEarliestAsyncJobByNameSelector(`earliest`)()
  const latestAsyncJobByNameSelector =
    createLatestOrEarliestAsyncJobByNameSelector(`latest`)()
  it(`should compare time by earliest if time was specified as earliest`, () => {
    const result = earliestAsyncJobByNameSelector(mockState, {
      name,
      compareTimestamp: AsyncStatus.LOADING,
    })
    expect(result).toStrictEqual(a)
  })

  it(`should compare time by latest if time was specified as latest`, () => {
    const result = latestAsyncJobByNameSelector(mockState, {
      name,
      compareTimestamp: AsyncStatus.LOADING,
    })
    expect(result).toStrictEqual(d)
  })

  it(`should also include job of which status is not equal to compareTimestamp if onlyCurrentStatus option is supplied as false`, () => {
    const result = latestAsyncJobByNameSelector(mockState, {
      name,
      compareTimestamp: AsyncStatus.LOADING,
      onlyCurrentStatus: false,
    })
    expect(result).toStrictEqual(g)
  })
  it(`should select different names of async jobs`, () => {
    const result = earliestAsyncJobByNameSelector(mockState, {
      name: name2,
      compareTimestamp: AsyncStatus.LOADING,
      onlyCurrentStatus: false,
    })
    expect(result).toStrictEqual(e)
  })
  it(`should return undefined if no job of matching name is found`, () => {
    const result = earliestAsyncJobByNameSelector(mockState, {
      name: `NO_MATCHING_NAME`,
      compareTimestamp: AsyncStatus.LOADING,
    })
    const result2 = earliestAsyncJobByNameSelector(mockState, {
      name: `NO_MATCHING_NAME`,
      compareTimestamp: AsyncStatus.LOADING,
      onlyCurrentStatus: false,
    })
    expect(result).toBeUndefined()
    expect(result2).toBeUndefined()
  })
})

describe(`asyncJobByIdSelector`, () => {
  it(`should return undefined if no matching job was found`, () => {
    const result = asyncJobByIdSelector(mockState, `NO_MATCHING_NAME`)

    expect(result).toBeUndefined()
  })

  it(`should return matching job if found`, () => {
    const result = asyncJobByIdSelector(mockState, c.id)

    expect(result).toStrictEqual(c)
  })
})
