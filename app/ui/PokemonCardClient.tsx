'use client'

import { useContext, useState } from 'react'
import type { EvolutionDetail } from 'pokenode-ts'

import PrettifyName from '@/app/utils/PrettifyName'
import EvolutionDetailText from '@/app/ui/EvolutionDetailText'
import { FiltersContext } from '@/app/contexts/FiltersContext'

export default function PokemonCardClient({
  sprite,
  pokedexName,
  dexNumber,
  speciesName,
  isEvolution,
  evolvesFromName,
  evolutionDetails
}: {
  sprite: string | null,
  pokedexName: string,
  dexNumber: number,
  speciesName: string,
  isEvolution: boolean,
  evolvesFromName: string,
  evolutionDetails: EvolutionDetail[]
}) {
  const storageKey: string = `${pokedexName}-${speciesName}`
  const initialIsCaught = localStorage.getItem(storageKey) === 'true'
  const [isCaught, setIsCaught] = useState(initialIsCaught)
  function toggleCaught() {
    localStorage.setItem(storageKey, `${!isCaught}`)
    setIsCaught(!isCaught)
  }
  const filters = useContext(FiltersContext)

  const prettySpecies = PrettifyName(speciesName)
  const prettyEvolvesFrom = PrettifyName(evolvesFromName)

  // hide this card if:
  const filteredOut =
    // it is caught and the caught filter is on, or
    (filters.hideCaught && isCaught) ||
    // if it doesn't match the name filter
    (filters.nameFilter &&
      !(prettySpecies.toLowerCase().indexOf(filters.nameFilter.toLowerCase()) !== -1 ||
        prettyEvolvesFrom.toLowerCase().indexOf(filters.nameFilter.toLowerCase()) !== -1)
    )

  return (
    <div
      className={`
        ${filteredOut ? 'hidden' : ''}
        p-4
        rounded-xl
        bg-slate-700
        ${isCaught ? 'opacity-50' : ''}
        outline-offset-1
        outline-white/10
        flex flex-col
        gap-1
        grow-0
        shrink-0
        w-full
        transition
        sm:w-auto
        sm:basis-64
      `}
    >
      <div
        className='flex flex-row justify-center gap-2'
      >
        <div
          className='flex flex-column justify-center rounded-xl bg-slate-600 hover:bg-slate-500 transition p-4 cursor-pointer'
          onClick={toggleCaught}
        >
          <input
            className='my-auto cursor-pointer'
            type='checkbox'
            checked={isCaught}
            onChange={toggleCaught}
          />
        </div>
        {sprite ?
          <img
            src={sprite}
            width={96}
            height={96}
            className='rounded-xl bg-slate-600'
          />
          : ''}
      </div>
      <p>
        {dexNumber} {prettySpecies}
      </p>
      {isEvolution ?
        <p>
          Evolves from <strong>{prettyEvolvesFrom}</strong>
        </p> :
        ''}
      <ul>
        {evolutionDetails ? evolutionDetails.map((evolution, idx) => (
          <li
            key={idx}
          >
            <EvolutionDetailText evolutionDetail={evolution} />
          </li>
        )) : ''}
      </ul>
    </div>
  )
}
