import axios, { AxiosError, AxiosResponse } from "axios"
import React, { useEffect, useState } from "react"
import { FC } from "react"
import { tcAsync } from "../../utilities/essentials"

enum NetworkRequestStatus {
  LOADING = `LOADING`,
  ERROR = `ERROR`,
  SUCCESS = `SUCCESS`,
}

// eslint-disable-next-line @typescript-eslint/ban-types
export type ExampleImpureProps = {
  color: string
}

export const ExampleImpure: FC<ExampleImpureProps> = ({ color }) => {
  const [exampleText, setExampleText] = useState<Readonly<null | string>>(null)
  const [networkRequestStatus, setnetworkRequestStatus] =
    useState<NetworkRequestStatus>(NetworkRequestStatus.LOADING)

  useEffect(() => {
    async function getIpsumText() {
      const [getIpsumTextRequestError, getIpsumTextRequest] = await tcAsync<
        AxiosResponse<string>,
        AxiosError
      >(
        axios(
          `https://baconipsum.com/api/?type=all-meat&paras=2&start-with-lorem=1`
        )
      )

      if (getIpsumTextRequestError || !getIpsumTextRequest) {
        setnetworkRequestStatus(NetworkRequestStatus.ERROR)
        return
      }

      setnetworkRequestStatus(NetworkRequestStatus.SUCCESS)
      setExampleText(getIpsumTextRequest.data)
    }

    getIpsumText()
  }, [])

  if (networkRequestStatus === NetworkRequestStatus.ERROR)
    return (
      <p
        style={{
          color: `red`,
        }}
      >
        error occurred while getting the text from server. Please try again.
      </p>
    )

  if (networkRequestStatus === NetworkRequestStatus.LOADING) {
    return <p>loading...</p>
  }

  return <ExamplePure color={color}>{exampleText}</ExamplePure>
}

// eslint-disable-next-line @typescript-eslint/ban-types
export type ExamplePureProps = {
  color: string
}

export const ExamplePure: FC<ExamplePureProps> = ({ color, children }) => (
  <div>
    <p
      style={{
        color,
      }}
    >
      {children}
    </p>
  </div>
)
