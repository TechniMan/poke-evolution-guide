'use client'

import { useState } from 'react'
import HideCaughtSwitch from '@/app/ui/filters/HideCaughtSwitch'
import { Filters, FiltersContext } from '@/app/contexts/FiltersContext'
import NameFilterInput from '@/app/ui/filters/NameFilter'

const filterStorageKey = 'listpage-filters'

export default function PokemonListPageClient({
  children
}: {
  children: React.ReactNode
}) {
  const initialFilterState = JSON.parse(
    localStorage.getItem(filterStorageKey) ||
    '{"hideCaught":false,"nameFilter":""}'
  )
  const [filters, setFilters] = useState<Filters>(initialFilterState)
  function persistFilterState(filterState: Filters) {
    localStorage.setItem(filterStorageKey, JSON.stringify(filterState))
  }

  function setHideCaught() {
    const newState = Object.assign({
      ...filters
    }, {
      hideCaught: !filters.hideCaught
    })
    setFilters(newState)
    persistFilterState(newState)
  }

  function setNameFilter(newFilter: string) {
    const newState = Object.assign({
      ...filters
    }, {
      nameFilter: newFilter
    })
    setFilters(newState)
    persistFilterState(newState)
  }

  return (
    <div>
      <div className='
        bg-slate-950
        flex
        flex-wrap
        gap-4
        p-2
        w-full
      '>
        <div className='
          sm:block
          hidden
          pl-2
          py-1
        '>
          Filters:
        </div>

        <HideCaughtSwitch
          hideCaught={filters.hideCaught}
          setHideCaught={setHideCaught}
        />

        <NameFilterInput
          nameFilter={filters.nameFilter}
          setNameFilter={setNameFilter}
        />
      </div>

      <div className='flex flex-wrap gap-4 sm:gap-6 p-4 justify-center'>

        <FiltersContext value={filters}>
          {children}
        </FiltersContext>
      </div >
    </div>
  )
}