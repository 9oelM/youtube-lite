import {
  createJob,
  createJobSet,
  startJob,
} from "src/utilities/redux-async/asyncActions"
import {
  asyncActionTypeCreator,
  CreateOrStartJobActionCreator,
  JobActions,
} from "src/utilities/redux-async/asyncTypes"

enum AllJobNames {
  LOGIN = `LOGIN`,
  LOGOUT = `LOGOUT`,
}

const loginAsyncJobs = createJobSet<
  AllJobNames.LOGIN,
  {
    email: string
    name: string
  },
  {
    oAuthToken: string
  },
  undefined,
  Error,
  {
    previousOAuthToken: string
  },
  undefined
>(AllJobNames.LOGIN)

describe(`createJobSet`, () => {
  it.each([
    loginAsyncJobs.cancel,
    loginAsyncJobs.create,
    loginAsyncJobs.fail,
    loginAsyncJobs.remove,
    loginAsyncJobs.start,
    loginAsyncJobs.succeed,
  ])(
    `%p should create redux action creator related to async jobs`,
    (actionCreator) => {
      expect(actionCreator).toBeDefined()
      expect(typeof actionCreator).toBe(`function`)
    }
  )

  it.each([
    {
      action: loginAsyncJobs.create({
        payload: {
          email: `test@test.com`,
          name: `jo jo jo`,
        },
      }),
      jobAction: JobActions.CREATE,
      jobName: AllJobNames.LOGIN,
    },
    {
      action: loginAsyncJobs.start({
        payload: {
          oAuthToken: `woigioghaiogoi3goi3iogah3ogh32hg32ohg32oh3o2gh`,
        },
      }),
      jobAction: JobActions.START,
      jobName: AllJobNames.LOGIN,
    },
    {
      action: loginAsyncJobs.succeed({
        id: `aoiroihof32oifho-13f`,
      }),
      jobAction: JobActions.SUCCEED,
      jobName: AllJobNames.LOGIN,
    },
    {
      action: loginAsyncJobs.cancel({
        id: `waeiofjwioefjowiaf`,
        payload: {
          previousOAuthToken: `woigioghaiogoi3goi3iogah3ogh32hg32ohg32oh3o2gh`,
        },
      }),
      jobAction: JobActions.CANCEL,
      jobName: AllJobNames.LOGIN,
    },
    {
      action: loginAsyncJobs.fail({
        id: `awjefoiwejfioajewf g4g2q332g`,
        payload: new Error(`errorro`),
      }),
      jobAction: JobActions.FAIL,
      jobName: AllJobNames.LOGIN,
    },
    {
      action: loginAsyncJobs.remove({
        id: `awjefoiwejfioajewf g4g2q332g`,
      }),
      jobAction: JobActions.REMOVE,
      jobName: AllJobNames.LOGIN,
    },
  ])(
    `should have the jobName and jobAction included as a .type that was fed as a argument from all action creators`,
    ({ action, jobAction, jobName }) => {
      expect(action).toHaveProperty(
        `type`,
        asyncActionTypeCreator(jobAction, jobName)
      )
    }
  )
})

describe(`createJob`, () => {
  it(`creates an action containing expected properties`, () => {
    const params: Parameters<CreateOrStartJobActionCreator<JobActions.CREATE>> =
      [
        {
          id: `awefawefeawfewfawe`,
          name: `TEST`,
          payload: {
            haha: `haha`,
          },
        },
      ]
    expect(createJob(...params)).toStrictEqual({
      ...params[0],
      type: asyncActionTypeCreator(JobActions.CREATE, `TEST`),
    })
  })
})

describe(`startJob`, () => {
  it(`creates an action containing expected properties`, () => {
    const params: Parameters<CreateOrStartJobActionCreator<JobActions.CREATE>> =
      [
        {
          id: `awefawefeawfewfawe2222`,
          name: `TEST22`,
          payload: {
            haha: `haha`,
            afewijwef: 1,
            waefjwlkf: {
              fawefawefio3: 1,
              faw4eoifhio: `89o31h`,
              fwefa: false,
            },
          },
        },
      ]
    expect(startJob(...params)).toStrictEqual({
      ...params[0],
      type: asyncActionTypeCreator(JobActions.START, `TEST22`),
    })
  })
})
