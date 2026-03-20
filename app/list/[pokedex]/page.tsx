import { GameClient } from 'pokenode-ts'

import PokemonCard from '@/components/list/PokemonCard'
import PokemonListPageClient from '@/list/[pokedex]/pageClient'

export default async function PokemonListPage({
  params
}: {
  params: Promise<{ pokedex: string }>
}) {
  const { pokedex: pokedexName } = await params
  const gameClient = new GameClient()
  const pokedex = await gameClient.getPokedexByName(pokedexName)

  return (
    <PokemonListPageClient>
      {pokedex.pokemon_entries.map((entry) => (
        <PokemonCard
          key={entry.entry_number}
          speciesName={entry.pokemon_species.name}
          dexNumber={entry.entry_number}
          pokedex={pokedex}
        />
      ))}
    </PokemonListPageClient>
  )
}
