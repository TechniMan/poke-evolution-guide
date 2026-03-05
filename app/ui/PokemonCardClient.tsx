'use client'

import type { EvolutionDetail } from 'pokenode-ts'

import PrettifyName from '@/app/utils/PrettifyName'
import EvolutionDetailText from '@/app/ui/EvolutionDetailText'

export default function PokemonCardClient({
  sprite,
  dexNumber,
  speciesName,
  isEvolution,
  evolvesFromName,
  evolutionDetails
}: {
  sprite: string | null,
  dexNumber: number,
  speciesName: string,
  isEvolution: boolean,
  evolvesFromName: string,
  evolutionDetails: EvolutionDetail[]
}) {
  return (
    <div
      className='p-4 rounded-xl bg-slate-700 outline-offset-1 outline-white/10 flex flex-col gap-1 grow-0 shrink-0 w-full sm:w-auto sm:basis-64'
    >
      {sprite ?
        <img
          src={sprite}
          width={96}
          height={96}
          className='rounded-xl bg-slate-600 mx-auto'
        />
        : ''}
      <p>
        {dexNumber} {PrettifyName(speciesName)}
      </p>
      {isEvolution ?
        <p>
          Evolves from <strong>{PrettifyName(evolvesFromName)}</strong>
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
