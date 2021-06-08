import { FC, memo } from "react"
import { withErrorBoundary } from "../components/Util/WithErrorBoundary"
import flow from "lodash.flow"

export const enhance: <Props>(
  Component: FC<Props>
) => (
  Fallback?: FC
) => React.MemoExoticComponent<({ ...props }: Props) => JSX.Element> = flow(
  memo,
  withErrorBoundary
)

export type TcResult<Data, Throws = Error> = [null, Data] | [Throws]

export async function tcAsync<T, Throws = Error>(
  promise: Promise<T>
): Promise<TcResult<T, Throws>> {
  try {
    const response: T = await promise

    return [null, response]
  } catch (error) {
    return [error]
  }
}

export function tcSync<
  ArrType,
  Params extends Array<ArrType>,
  Returns,
  Throws = Error
>(
  fn: (...params: Params) => Returns,
  ...deps: Params
): TcResult<Returns, Throws> {
  try {
    const data: Returns = fn(...deps)

    return [null, data]
  } catch (e) {
    return [e]
  }
}

export function exhaustiveCheck(x: never): void {
  throw new Error(`${x} should be unreachable`)
}

export enum AsyncStatus {
  /**
   * sometimes you need to make information about that request in advance and
   * wait until some time to do the actual request.
   */
  NOT_STARTED = `NOT_STARTED`,
  LOADING = `LOADING`,
  CANCELLED = `CANCELLED`,
  SUCCESS = `SUCCESS`,
  ERROR = `ERROR`,
}
