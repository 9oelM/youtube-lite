import { asyncReducer } from "src/utilities/redux-async/asyncReducer"
import { AsyncMeta, AsyncStatus } from "src/utilities/redux-async/asyncTypes"

export type AsyncJobSelectorOptions = {
  /**
   * @description name of the request.
   */
  name: string
  /**
   * @description timestamp of requests of the same name to be compared.
   * defaults to {@link AsyncStatus.LOADING}, which means
   * the timestamp that was recorded when the request turned LOADING (easily said, the async job started)
   * will be compared.
   *
   * if some of the requests contain no timetstamp of matching criteria at all,
   * they will be ignored.
   */
  compareTimestamp?: AsyncStatus | undefined
  /**
   * @default `true`
   * @description when there multiple requests and this option is supplied as `false`,
   * it will compare all async jobs that do not have the status of {@link compareTimestmp}.
   *
   * For example, if there are two existing async jobs in the reducer, like:
   *
   * @example
   * ```
   * const state = {
   *  async: {
   *    asyncJobs: {
   *     '1': {
   *         id: `1`,
   *          status: AsyncStatus.FAILURE,
   *          name: 'TEST',
   *          timestamp: {
   *            [AsyncStatus.NOT_STARTED]: 10,
   *            [AsyncStatus.LOADING]: 11,
   *            [AsyncStatus.FAILURE]: 12,
   *          },
   *      },
   *     '2': {
   *         id: `2`,
   *          status: AsyncStatus.LOADING,
   *          name: 'TEST',
   *          timestamp: {
   *            [AsyncStatus.LOADING]: 4,
   *          },
   *      }
   *   }
   *  }
   * }
   * ```
   *
   * and you run:
   * ```
   * const latestAsyncJobByNameSelector =
   *  createLatestAsyncJobByNameSelector()
   *
   * const asyncJob = latestAsyncJobByNameSelector(state, `TEST`, AsyncStatus.LOADING, false);
   * ```
   *
   * then, `asyncJob` will be the job of id `1`, not `2`
   * because it also looks over the job that does not have the status of `AsyncStatus.LOADING`.
   *
   */
  onlyCurrentStatus?: boolean
}

/**
 * @description selects the latest/earliest request of a supplied name.
 * if there are more than or equal to two requests of the same name,
 *
 * @returns the matching async job
 * @returns `undefined` if no matching job was found
 */
type LatestOrEarliestAsyncJobSelector = <
  AppError extends Error,
  AppRootState extends {
    async: ReturnType<typeof asyncReducer>
  } = {
    async: ReturnType<typeof asyncReducer>
  }
>() => (
  s: AppRootState,
  { name, compareTimestamp, onlyCurrentStatus }: AsyncJobSelectorOptions
) => AsyncMeta<string, AppError> | undefined

export function createLatestOrEarliestAsyncJobByNameSelector(
  time: `earliest` | `latest`
): LatestOrEarliestAsyncJobSelector {
  return function createLatestOrEarliestAsyncJobByNameSelector<
    AppError extends Error,
    AppRootState extends {
      async: ReturnType<typeof asyncReducer>
    } = {
      async: ReturnType<typeof asyncReducer>
    }
  >(): (
    s: AppRootState,
    { name, compareTimestamp, onlyCurrentStatus }: AsyncJobSelectorOptions
  ) => undefined | AsyncMeta<string, AppError> {
    return (
      s,
      { name, compareTimestamp = AsyncStatus.LOADING, onlyCurrentStatus = true }
    ) => {
      const asyncJobsInArray = Object.values(s.async.asyncJobs)
      let latestOrEarliestAsyncJobIndexWithMatchingName: number | null = null

      for (const [index, asyncJob] of asyncJobsInArray.entries()) {
        if (
          asyncJob.name === name &&
          latestOrEarliestAsyncJobIndexWithMatchingName === null
        )
          latestOrEarliestAsyncJobIndexWithMatchingName = index
        else if (asyncJob.name !== name) continue

        if (onlyCurrentStatus && asyncJob.status !== compareTimestamp) continue

        if (
          asyncJob[`timestamp`][compareTimestamp] !== undefined &&
          latestOrEarliestAsyncJobIndexWithMatchingName !== null &&
          asyncJob[`timestamp`][compareTimestamp] ===
            (time === `latest` ? Math.max : Math.min)(
              // it should be already defined here
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              asyncJobsInArray[latestOrEarliestAsyncJobIndexWithMatchingName]!
                .timestamp[compareTimestamp]!,
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              asyncJob[`timestamp`][compareTimestamp]!
            )
        ) {
          latestOrEarliestAsyncJobIndexWithMatchingName = index
        }
      }

      if (latestOrEarliestAsyncJobIndexWithMatchingName === null)
        return undefined
      return asyncJobsInArray[
        latestOrEarliestAsyncJobIndexWithMatchingName
      ] as AsyncMeta<string, AppError>
    }
  }
}

export const createLatestAsyncJobByNameSelector =
  createLatestOrEarliestAsyncJobByNameSelector(`latest`)
export const createEarliestAsyncJobByNameSelector =
  createLatestOrEarliestAsyncJobByNameSelector(`earliest`)

/**
 *
 * @param s the root redux state of your application
 * @param id the id of async job
 * @returns `undefined` if no matching job was found
 * @returns the matching async job
 */
export function asyncJobByIdSelector<
  AppError extends Error,
  AppRootState extends {
    async: ReturnType<typeof asyncReducer>
  } = {
    async: ReturnType<typeof asyncReducer>
  }
>(s: AppRootState, id: string): AsyncMeta<string, AppError> | undefined {
  if (id in s.async.asyncJobs)
    return s.async.asyncJobs[id] as AsyncMeta<string, AppError>

  return undefined
}
