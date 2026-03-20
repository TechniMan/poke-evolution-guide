'use client'

import { useState } from 'react'
import type { Region } from 'pokenode-ts'

import Selector from '@/components/basic/Selector'
import { LocationFilterContext } from '@/contexts/LocationFilterContext'
import { VersionFilterContext } from '@/contexts/VersionFilterContext'
import PrettifyName from '@/utils/PrettifyName'

export default function PokemonMapPageClient({
  children,
  region,
  versionsList
}: {
  children: React.ReactNode,
  region: Region,
  versionsList: string[]
}) {
  const [selectedLocation, setSelectedLocation] = useState(region.locations[0].name)
  const [versionFilter, setVersionFilter] = useState(versionsList[0])

  return (
    <div
      className='p-4 pt-2 w-full'
    >
      <Selector
        label='Version:'
        options={versionsList.map(v => ({
          label: PrettifyName(v),
          value: v
        }))}
        setSelection={setVersionFilter}
      />

      <Selector
        label='Location:'
        options={region.locations.map(loc => ({
          label: PrettifyName(loc.name),
          value: loc.name
        }))}
        setSelection={setSelectedLocation}
      />

      <LocationFilterContext value={selectedLocation}>
        <VersionFilterContext value={versionFilter}>
          {children}
        </VersionFilterContext>
      </LocationFilterContext>
    </div>
  )
}
