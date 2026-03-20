'use client'

import { useContext } from 'react'
import type { LocationArea } from 'pokenode-ts'

import { LocationAreaFilterContext } from '@/contexts/LocationAreaFilterContext'
import { VersionFilterContext } from '@/contexts/VersionFilterContext'
import PrettifyName from '@/utils/PrettifyName'

export default function LocationAreaClient({
  locationArea
}: {
  locationArea: LocationArea
}) {
  const versionFilter = useContext(VersionFilterContext)
  const locationAreaFilter = useContext(LocationAreaFilterContext)

  const hasEncountersForVersion = locationArea.pokemon_encounters.some(pe => {
    return pe.version_details.some(ver => {
      return ver.version.name === versionFilter
    })
  })

  return (
    // only show this area if it matches the filter
    locationAreaFilter === locationArea.name ?
      // if there are no encounters here for this game, show a message instead
      hasEncountersForVersion ?
        // table
        <div className='
          bg-slate-800
          flex
          flex-col
          gap-1
          mb-4
          px-2
          pb-2
          pt-1
          rounded-md
          w-full
        '>
          {/* table header row */}
          <div
            className='
              grid
              grid-cols-[1fr_1fr_1fr_1fr_1fr]
              px-2
              py-1
              w-full
            '
          >
            <div>Pokemon species</div>
            <div>Method</div>
            <div>Chance to find</div>
            <div>Level range</div>
            <div>Conditions</div>
          </div>

          {locationArea.pokemon_encounters.map((enc, idx) => (
            enc.version_details.some(vd => vd.version.name === versionFilter) ?
              <div
                key={idx}
              >
                {enc.version_details
                  .filter(ver => ver.version.name === versionFilter)
                  .map((verDets, idx2) => (
                    verDets.encounter_details.map((encDets, idx3) => (
                      <div
                        className='
                          bg-slate-700
                          grid
                          grid-cols-[1fr_1fr_1fr_1fr_1fr]
                          px-2
                          py-1
                          w-full
                        '
                        key={idx3}
                      >
                        <div>{PrettifyName(enc.pokemon.name)}</div>
                        <div>{PrettifyName(encDets.method.name)}</div>
                        <div>{encDets.chance}</div>
                        <div>{encDets.min_level} - {encDets.max_level}</div>
                        <div>
                          {encDets.condition_values.map((condition, idx4) => (
                            <div key={idx4}>{PrettifyName(condition.name)}</div>
                          ))}
                        </div>
                      </div>
                    ))
                  ))
                }
              </div>
              : ''
          ))}
        </div>
        : `No encounters in this area for version: ${PrettifyName(versionFilter)}`
      : ''
  )
}
