import { Dispatch, SetStateAction, useCallback, useMemo, useState } from "react"

export function useBoolean(
  defaultValue: boolean
): [
  booleanValue: boolean,
  setTrue: VoidFunction,
  setFalse: VoidFunction,
  setter: Dispatch<SetStateAction<boolean>>
] {
  const [booleanValue, setBooleanValue] = useState<boolean>(defaultValue)

  const setTrue = useCallback(() => {
    setBooleanValue(true)
  }, [])

  const setFalse = useCallback(() => {
    setBooleanValue(false)
  }, [])

  const setter = useMemo(() => setBooleanValue, [setBooleanValue])

  return [booleanValue, setTrue, setFalse, setter]
}
