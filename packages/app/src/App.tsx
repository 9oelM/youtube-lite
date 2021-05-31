import React from "react"
import { FC } from "react"
import { Provider } from "react-redux"
import { ExampleImpure } from "src/components/Example"
import { store } from "src/store"

export const App: FC = () => {
  return (
    <Provider store={store}>
      <ExampleImpure color="#345345" />
    </Provider>
  )
}
