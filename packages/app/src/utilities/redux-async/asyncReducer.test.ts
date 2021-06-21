import {
  cancelJob,
  createJob,
  failJob,
  removeJob,
  startJob,
  succeedJob,
} from "src/utilities/redux-async/asyncActions"
import {
  asyncReducer,
  AsyncReducerState,
} from "src/utilities/redux-async/asyncReducer"
import { AsyncStatus } from "src/utilities/redux-async/asyncTypes"

const initialState: AsyncReducerState = {
  asyncJobs: {},
}

const actionParams = { id: `i-d-i-d`, name: `TEST_NAME` }

const state0: AsyncReducerState = {
  asyncJobs: {
    DIFFERENT_ID: {
      id: `DIFFERENT_ID`,
      status: AsyncStatus.LOADING,
      name: actionParams.name,
      timestamp: {
        [AsyncStatus.LOADING]: Date.now(),
      },
    },
  },
}
const state1: AsyncReducerState = {
  asyncJobs: {
    [actionParams.id]: {
      id: actionParams.id,
      status: AsyncStatus.LOADING,
      name: actionParams.name,
      timestamp: {
        [AsyncStatus.LOADING]: Date.now(),
      },
    },
  },
}

describe(`asyncReducer`, () => {
  it(`should return the previous state when no recognizable action is input`, () => {
    expect(
      asyncReducer(initialState, { type: `__DO_NOT_RECOGNIZE_ME__` })
    ).toStrictEqual(initialState)
  })

  it.each([
    failJob<string, undefined>(actionParams),
    removeJob(actionParams),
    cancelJob(actionParams),
    succeedJob(actionParams),
  ])(
    `should return the previous state when there is no matching id in state.asyncJobs for $type`,
    (action) => {
      expect(asyncReducer(state0, action)).toStrictEqual(state0)
    }
  )

  it(`should return the previous state when there is a matching id in state.asyncJobs for createJob action`, () => {
    expect(asyncReducer(state1, createJob(actionParams))).toStrictEqual(state1)
  })

  it.each([
    {
      action: startJob(actionParams),
      asyncStatus: AsyncStatus.LOADING,
    },
    {
      action: failJob(actionParams),
      asyncStatus: AsyncStatus.FAILURE,
    },
    {
      action: cancelJob(actionParams),
      asyncStatus: AsyncStatus.CANCELLED,
    },
    {
      action: succeedJob(actionParams),
      asyncStatus: AsyncStatus.SUCCESS,
    },
  ])(
    `should add relevant information when there is a matching id in state.asyncJobs for %p`,
    ({ action, asyncStatus }) => {
      const nextState = asyncReducer(state1, action)
      expect(nextState).toHaveProperty(
        [`asyncJobs`, actionParams.id, `status`],
        asyncStatus
      )
      expect(nextState).toHaveProperty(
        [`asyncJobs`, actionParams.id, `timestamp`, asyncStatus],
        expect.any(Number)
      )
    }
  )

  it.each([createJob(actionParams), startJob(actionParams)])(
    `should add a new AsyncMeta object when there is no matching id in state.asyncJobs for $type action`,
    (action) => {
      const previousStateKeysLength = Object.keys(state0.asyncJobs).length
      const nextState = asyncReducer(state0, action)
      const nextStateKeysLength = Object.keys(nextState.asyncJobs).length
      expect(previousStateKeysLength).toEqual(nextStateKeysLength - 1)
    }
  )

  it(`should delete job when there is a matching id in state.asyncJobs for removeJob action`, () => {
    expect(Object.keys(state1)).toHaveLength(1)
    const nextState = asyncReducer(state1, removeJob(actionParams))
    expect(nextState).not.toHaveProperty([`asyncJobs`, actionParams.id])
    expect(Object.keys(nextState.asyncJobs)).toHaveLength(0)
  })
})
