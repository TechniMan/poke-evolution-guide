import { createContext } from 'react'

export type Filters = {
  hideCaught: boolean,
  nameFilter: string
}

export const FiltersContext = createContext<Filters>({
  hideCaught: false,
  nameFilter: ''
})
