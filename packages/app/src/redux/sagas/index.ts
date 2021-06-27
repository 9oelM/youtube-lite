import { watchGetSearchResultStart } from "src/redux/sagas/async/youtube"
import { all, call, spawn } from "typed-redux-saga"

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function* rootSaga() {
  // https://redux-saga.js.org/docs/advanced/RootSaga/#keeping-everything-alive
  const sagas = [watchGetSearchResultStart]

  yield all(
    sagas.map((saga) =>
      spawn(function* () {
        while (true) {
          try {
            yield call(saga)
            break
          } catch (e) {
            console.log(e)
          }
        }
      })
    )
  )
}
