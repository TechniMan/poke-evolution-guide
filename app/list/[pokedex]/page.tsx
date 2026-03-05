import { GameClient } from 'pokenode-ts'

import PokemonCard from '@/app/ui/PokemonCard'
import HideCaughtSwitch from '@/app/ui/HideCaughtSwitch'

export default async function PokemonListPage({
  params,
  searchParams
}: {
  params: Promise<{ pokedex: string }>,
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const { pokedex: pokedexName } = await params
  const gameClient = new GameClient()
  const pokedex = await gameClient.getPokedexByName(pokedexName)

  const hideCaught = (await searchParams).hideCaught === 'true'

  return (
    <div className='flex flex-wrap gap-4 sm:gap-6 p-4 justify-center'>
      <HideCaughtSwitch hideCaught={hideCaught} />

      {pokedex.pokemon_entries.map((entry) => (
        <PokemonCard
          key={entry.entry_number}
          speciesName={entry.pokemon_species.name}
          dexNumber={entry.entry_number}
          pokedex={pokedex}
          hideCaught={hideCaught}
        />
      ))}
    </div>
  )
}
