import {
  AsyncMeta,
  AsyncStatus,
  GeneralJobActionEagerCreator,
  JobActions,
  REDUX_ASYNC_PREFIX,
} from "src/utilities/redux-async/asyncTypes"
import { produce } from "immer"
import type { nanoid } from "nanoid"
import type { AnyAction } from "redux"
import { asyncReducerErrorReporter } from "src/utilities/redux-async/asyncReducerErrors"

export type AsyncReducerState = {
  asyncJobs: Record<ReturnType<typeof nanoid>, AsyncMeta<string, Error>>
}

export const asyncReducer = produce<
  (state: AsyncReducerState, action: AnyAction) => AsyncReducerState
>(
  (state, action) => {
    if (isAsyncActionType(action, JobActions.CREATE)) {
      if (action.id in state.asyncJobs) {
        asyncReducerErrorReporter.jobExistsOnCreate.describe(action)
        return state
      }

      state.asyncJobs[action.id] = {
        id: action.id,
        status: AsyncStatus.NOT_STARTED,
        name: action.name,
        timestamp: {
          [AsyncStatus.NOT_STARTED]: Date.now(),
        },
      }
      return state
    }
    if (isAsyncActionType(action, JobActions.START)) {
      if (action.id in state.asyncJobs) {
        const job = state.asyncJobs[action.id]
        if (job) {
          job.status = AsyncStatus.LOADING
          job.timestamp[AsyncStatus.LOADING] = Date.now()
        }

        return state
      }

      state.asyncJobs[action.id] = {
        id: action.id,
        status: AsyncStatus.LOADING,
        name: action.name,
        timestamp: {
          [AsyncStatus.LOADING]: Date.now(),
        },
      }
      return state
    }
    if (isAsyncActionType(action, JobActions.FAIL)) {
      if (!(action.id in state.asyncJobs)) {
        asyncReducerErrorReporter.jobDoesNotExistError.describe(action)
        return state
      }

      const job = state.asyncJobs[action.id]

      if (!job) return state

      job.error = action.payload
      job.status = AsyncStatus.FAILURE
      job.timestamp[AsyncStatus.FAILURE] = Date.now()

      return state
    }
    if (isAsyncActionType(action, JobActions.REMOVE)) {
      if (!(action.id in state.asyncJobs)) {
        asyncReducerErrorReporter.jobDoesNotExistWarning.describe(action)
        return state
      }

      delete state.asyncJobs[action.id]

      return state
    }
    if (isAsyncActionType(action, JobActions.CANCEL)) {
      if (!(action.id in state.asyncJobs)) {
        asyncReducerErrorReporter.jobDoesNotExistWarning.describe(action)
        return state
      }

      const job = state.asyncJobs[action.id]

      if (!job) return state

      job.status = AsyncStatus.CANCELLED
      job.timestamp[AsyncStatus.CANCELLED] = Date.now()

      return state
    }
    if (isAsyncActionType(action, JobActions.SUCCEED)) {
      if (!(action.id in state.asyncJobs)) {
        asyncReducerErrorReporter.jobDoesNotExistError.describe(action)
        return state
      }

      const job = state.asyncJobs[action.id]

      if (!job) return state

      job.status = AsyncStatus.SUCCESS
      job.timestamp[AsyncStatus.SUCCESS] = Date.now()

      return state
    }

    return state
  },
  {
    asyncJobs: {},
  }
)

function isAsyncActionType<JobAction extends JobActions>(
  action: Record<string | number | symbol, any> & { type: string },
  jobAction: JobAction
): action is ReturnType<GeneralJobActionEagerCreator<JobAction, string, any>> {
  return (
    typeof action.type === `string` &&
    action.type.startsWith(`${REDUX_ASYNC_PREFIX}/${jobAction}`)
  )
}
