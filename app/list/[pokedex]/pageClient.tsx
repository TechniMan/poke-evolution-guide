'use client'

import { useState } from 'react'
import HideCaughtSwitch from '@/app/ui/filters/HideCaughtSwitch'
import { Filters, FiltersContext } from '@/app/contexts/FiltersContext'
import NameFilterInput from '@/app/ui/filters/NameFilter'

export default function PokemonListPageClient({
  children
}: {
  children: React.ReactNode
}) {
  const [filters, setFilters] = useState<Filters>({
    hideCaught: false,
    nameFilter: ''
  })

  function setHideCaught() {
    setFilters(Object.assign({
      ...filters
    }, {
      hideCaught: !filters.hideCaught
    }))
  }

  function setNameFilter(newFilter: string) {
    setFilters(Object.assign({
      ...filters
    }, {
      nameFilter: newFilter
    }))
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