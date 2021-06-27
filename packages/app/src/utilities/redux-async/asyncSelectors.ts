import { asyncReducer } from "src/utilities/redux-async/asyncReducer"
import { AsyncMeta, AsyncStatus } from "src/utilities/redux-async/asyncTypes"

/**
 * selects the latest request of a supplied name.
 * if there are more than or equal to two requests of the same name,
 */
type LatestOrEarliestRequestSelector = <
  AppError extends Error,
  AppRootState extends {
    async: ReturnType<typeof asyncReducer>
  } = {
    async: ReturnType<typeof asyncReducer>
  }
>() => (
  s: AppRootState,
  name: string,
  compareTimestamp?: AsyncStatus | undefined,
  onlyCurrentStatus?: boolean
) => AsyncMeta<string, AppError> | undefined

export function createLatestOrEarliestRequestByNameSelector(
  time: `earliest` | `latest`
): LatestOrEarliestRequestSelector {
  return function createLatestOrEarliestRequestByNameSelector<
    AppError extends Error,
    AppRootState extends {
      async: ReturnType<typeof asyncReducer>
    } = {
      async: ReturnType<typeof asyncReducer>
    }
  >(): (
    s: AppRootState,
    name: string,
    /**
     * timestamp of requests of the same name to be compared.
     * defaults to {@link AsyncStatus.LOADING}, which means
     * the timestamp that was recorded when the request turned LOADING (easily said, the async job started)
     * will be compared.
     *
     * if some of the requests contain no timetstamp of matching criteria at all,
     * they will be ignored.
     */
    compareTimestamp?: AsyncStatus,
    onlyCurrentStatus?: boolean
  ) => undefined | AsyncMeta<string, AppError> {
    return (
      s,
      name,
      compareTimestamp = AsyncStatus.LOADING,
      onlyCurrentStatus = true
    ) => {
      const asyncJobsInArray = Object.values(s.async.asyncJobs)
      let latestOrEarliestRequestIndexWithMatchingName: number | null = null

      for (const [index, asyncJob] of asyncJobsInArray.entries()) {
        if (
          asyncJob.name === name &&
          latestOrEarliestRequestIndexWithMatchingName === null
        )
          latestOrEarliestRequestIndexWithMatchingName = index
        else if (asyncJob.name !== name) continue

        if (onlyCurrentStatus && asyncJob.status !== compareTimestamp) continue

        if (
          asyncJob[`timestamp`][compareTimestamp] !== undefined &&
          latestOrEarliestRequestIndexWithMatchingName !== null &&
          asyncJob[`timestamp`][compareTimestamp] ===
            (time === `latest` ? Math.max : Math.min)(
              // it should be already defined here
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              asyncJobsInArray[latestOrEarliestRequestIndexWithMatchingName]!
                .timestamp[compareTimestamp]!,
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              asyncJob[`timestamp`][compareTimestamp]!
            )
        ) {
          latestOrEarliestRequestIndexWithMatchingName = index
        }
      }

      if (latestOrEarliestRequestIndexWithMatchingName === null)
        return undefined
      return asyncJobsInArray[
        latestOrEarliestRequestIndexWithMatchingName
      ] as AsyncMeta<string, AppError>
    }
  }
}

export const createLatestRequestByNameSelector =
  createLatestOrEarliestRequestByNameSelector(`latest`)
export const createEarliestRequestByNameSelector =
  createLatestOrEarliestRequestByNameSelector(`earliest`)
