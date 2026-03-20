'use client'

import { useContext, useState } from 'react'
import { Location } from 'pokenode-ts'

import { LocationAreaFilterContext } from '@/contexts/LocationAreaFilterContext'
import { LocationFilterContext } from '@/contexts/LocationFilterContext'
import Selector from '@/components/basic/Selector'
import PrettifyName from '@/utils/PrettifyName'

export default function LocationClient({
  children,
  location
}: {
  children: React.ReactNode,
  location: Location
}) {
  const locationFilter = useContext(LocationFilterContext)
  const [selectedArea, setSelectedArea] = useState(location.areas[0] ? location.areas[0].name : '')

  return (
    location.name === locationFilter ?
      <div>
        <Selector
          label='Location Area:'
          options={location.areas.map(area => ({
            label: PrettifyName(area.name),
            value: area.name
          }))}
          setSelection={setSelectedArea}
        />

        <LocationAreaFilterContext value={selectedArea}>
          {children}
        </LocationAreaFilterContext>
      </div> :
      ''
  )
}