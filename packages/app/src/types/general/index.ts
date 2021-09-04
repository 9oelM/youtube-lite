import { DeepReadonly } from "ts-essentials"

export type CurrentFocusedSuggestion = null | DeepReadonly<{
  suggestion: string
  index: number
}>
