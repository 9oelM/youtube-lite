import { MarkRequired } from "ts-essentials"
import { nanoid } from "nanoid"

export enum AsyncStatus {
  /**
   * @description when the Job has been first made
   * and the actual async Job has not been started
   */
  NOT_STARTED = `NOT_STARTED`,
  LOADING = `LOADING`,
  SUCCESS = `SUCCESS`,
  FAILURE = `FAILURE`,
  CANCELLED = `CANCELLED`,
}

export type AsyncMeta<RequestName extends string, Err = Error> = {
  /**
   * @description the unique id of a Job.
   * Many jobs can have the same name, but not the same id.
   */
  id: ReturnType<typeof nanoid>
  status: AsyncStatus
  /**
   * @description error will be stored here once it happens
   */
  error?: Err
  /**
   * @description The name of a specific Job.
   * @example `DELETE_USER`
   * @warning a Job name should be unique across your application.
   */
  name: RequestName
  /**
   * time at which each action of the Job took place
   */
  timestamp: {
    [AsyncStatus.NOT_STARTED]?: number
    [AsyncStatus.LOADING]?: number
    [AsyncStatus.SUCCESS]?: number
    [AsyncStatus.FAILURE]?: number
    [AsyncStatus.CANCELLED]?: number
  }
}

export enum JobActions {
  CREATE = `CREATE`,
  START = `START`,
  SUCCEED = `SUCCEED`,
  FAIL = `FAIL`,
  CANCEL = `CANCEL`,
  /**
   * @description used to remove the Job from reducer.
   */
  REMOVE = `REMOVE`,
}

export const REDUX_ASYNC_PREFIX = `@RA` as const

export type ActionTypeCreator<
  JobAction extends JobActions,
  JobName extends string
> = `${typeof REDUX_ASYNC_PREFIX}/${JobAction}/${JobName}`

export const asyncActionTypeCreator: <
  JobAction extends JobActions,
  JobName extends string
>(
  jobAction: JobAction,
  name: JobName
) => ActionTypeCreator<JobAction, JobName> = (jobAction, name) =>
  `${REDUX_ASYNC_PREFIX}/${jobAction}/${name}`

export type AsyncJobParams<JobName extends string, Payload> = Pick<
  AsyncMeta<JobName>,
  `name`
> &
  Partial<Pick<AsyncMeta<JobName>, `id`>> & {
    payload?: Payload | undefined
  }

export type AsyncJobReturns<JobName extends string, Payload> =
  | Pick<AsyncMeta<JobName>, `id` | `name`> &
      (Payload extends undefined | never
        ? // eslint-disable-next-line @typescript-eslint/ban-types
          {}
        : {
            payload: Payload
          })

/**
 * @description used to create `createJob` and `startJob` actions.
 */
export type CreateOrStartJobActionCreator<JobAction extends JobActions> = <
  JobName extends string,
  Payload
>(
  params: AsyncJobParams<JobName, Payload>
) => AsyncJobReturns<JobName, Payload> & {
  type: ActionTypeCreator<JobAction, JobName>
}

/**
 * @description same as {@link CreateOrStartJobActionCreator} but
 * eagerly requires three generic arguments
 */
export type CreateOrStartJobActionEagerCreator<
  JobAction extends JobActions,
  JobName extends string,
  Payload
> = (params: AsyncJobParams<JobName, Payload>) => AsyncJobReturns<
  JobName,
  Payload
> & {
  type: ActionTypeCreator<JobAction, JobName>
}

/**
 * used to create Job actions for
 * succeed, fail, cancel and remove actions
 */
export type GeneralJobActionCreator<JobAction extends JobActions> = <
  JobName extends string,
  Payload
>(
  params: MarkRequired<AsyncJobParams<JobName, Payload>, `id`>
) => AsyncJobReturns<JobName, Payload> & {
  type: ActionTypeCreator<JobAction, JobName>
}

/**
 * @description same as {@link GeneralJobActionCreator} but
 * eagerly requires three generic arguments
 */
export type GeneralJobActionEagerCreator<
  JobAction extends JobActions,
  JobName extends string,
  Payload
> = (
  params: Omit<MarkRequired<AsyncJobParams<JobName, Payload>, `id`>, `name`>
) => AsyncJobReturns<JobName, Payload> & {
  type: ActionTypeCreator<JobAction, JobName>
}

/**
 * @description ts-only user defined typeguard
 * @example
 * ```
 * const action = createJob({ name: `YOUTUBE_LITE`, payload: { is: `awesome` } })
 * if (isSpecificAsyncActionType(action, JobActions.CREATE, `YOUTUBE_LITE`)) {
 *  console.log(action.type === `@RA/CREATE/YOUTUBE_LITE`) // true
 * }
 * ```
 */
export function isSpecificAsyncActionType<
  JobAction extends JobActions,
  JobName extends string,
  Payload
>(
  action: Record<string | number | symbol, unknown> & { type: string },
  jobAction: JobAction,
  jobName: JobName
): action is ReturnType<
  GeneralJobActionEagerCreator<JobAction, JobName, Payload>
> {
  return (
    typeof action.type === `string` &&
    action.type === `${REDUX_ASYNC_PREFIX}/${jobAction}/${jobName}`
  )
}

export type CreateOrStartAsyncActionCreatorWithoutNameParameter<
  JobAction extends JobActions,
  JobName extends string,
  Payload
> = (
  params: Payload extends undefined
    ? Omit<
        Parameters<
          CreateOrStartJobActionEagerCreator<JobAction, JobName, Payload>
        >[0],
        `name` | `payload`
      >
    : MarkRequired<
        Omit<
          Parameters<
            CreateOrStartJobActionEagerCreator<JobAction, JobName, Payload>
          >[0],
          `name`
        >,
        `payload`
      >
) => ReturnType<CreateOrStartJobActionEagerCreator<JobAction, JobName, Payload>>

export type GeneralAsyncActionCreatorWithoutNameParameter<
  JobAction extends JobActions,
  JobName extends string,
  Payload
> = (
  params: Payload extends undefined
    ? Omit<
        Parameters<
          GeneralJobActionEagerCreator<JobAction, JobName, Payload>
        >[0],
        `name` | `payload`
      >
    : MarkRequired<
        Omit<
          Parameters<
            GeneralJobActionEagerCreator<JobAction, JobName, Payload>
          >[0],
          `name`
        >,
        `payload`
      >
) => ReturnType<GeneralJobActionEagerCreator<JobAction, JobName, Payload>>
