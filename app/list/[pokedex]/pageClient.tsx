'use client'

import { useEffect, useState } from 'react'
import HideCaughtSwitch from '@/components/filters/HideCaughtSwitch'
import { Filters, FiltersContext } from '@/contexts/FiltersContext'
import NameFilterInput from '@/components/filters/NameFilter'

const filterStorageKey = 'listpage-filters'

export default function PokemonListPageClient({
  children
}: {
  children: React.ReactNode
}) {
  const [filters, setFilters] = useState<Filters>({} as Filters)
  function persistFilterState(filterState: Filters) {
    localStorage.setItem(filterStorageKey, JSON.stringify(filterState))
  }

  useEffect(() => {
    const initialFilterState = JSON.parse(
      localStorage.getItem(filterStorageKey) ||
      '{"hideCaught":false,"nameFilter":""}'
    )
    setFilters(initialFilterState)
  }, [])

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
    <div className='grid grid-cols-1 grid-rows-[auto_1fr] h-full'>
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

      <div className='flex flex-wrap gap-4 sm:gap-6 p-4 justify-center overflow-y-auto'>
        <FiltersContext value={filters}>
          {children}
        </FiltersContext>
      </div >
    </div>
  )
}