'use client'

import { useEffect, useState } from 'react'
import type { Region } from 'pokenode-ts'

import Selector from '@/components/basic/Selector'
import { LocationFilterContext } from '@/contexts/LocationFilterContext'
import { VersionFilterContext } from '@/contexts/VersionFilterContext'
import PrettifyName from '@/utils/PrettifyName'

const versionFilterStorageKey = 'mappage-filter-version'

export default function PokemonMapPageClient({
  children,
  region,
  versionsList
}: {
  children: React.ReactNode,
  region: Region,
  versionsList: string[]
}) {
  const [versionFilter, setVersionFilter] = useState('')
  function handleVersionSelection(newValue: string) {
    setVersionFilter(newValue)
    localStorage.setItem(versionFilterStorageKey, newValue)
  }

  useEffect(() => {
    const initialVersion = localStorage.getItem(versionFilterStorageKey) || versionsList[0]
    setVersionFilter(initialVersion)
  }, [])

  const [selectedLocation, setSelectedLocation] = useState(region.locations[0].name)

  return (
    <div
      className='p-4 pt-2 w-full grid grid-cols-1 grid-rows-[auto_1fr] h-full'
    >
      <div>
      <Selector
        label='Version:'
        options={versionsList.map(v => ({
          label: PrettifyName(v),
          value: v
        }))}
        setSelection={handleVersionSelection}
        initialSelectedValue={versionFilter}
      />

      <Selector
        label='Location:'
        options={region.locations.map(loc => ({
          label: PrettifyName(loc.name),
          value: loc.name
        }))}
        setSelection={setSelectedLocation}
      />
      </div>

      <div className='overflow-y-auto'>
      <LocationFilterContext value={selectedLocation}>
        <VersionFilterContext value={versionFilter}>
          {children}
        </VersionFilterContext>
      </LocationFilterContext>
      </div>
    </div>
  )
}
