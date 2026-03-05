import { GameClient } from 'pokenode-ts'
import PokemonCard from '@/app/ui/PokemonCard'

export default async function PokemonListPage({ params }: { params: Promise<{ pokedex: string }> }) {
  const { pokedex: pokedexName } = await params
  const gameClient = new GameClient()
  const pokedex = await gameClient.getPokedexByName(pokedexName)

  return (
    <div className='flex flex-wrap gap-4 p-4 justify-center'>
      {pokedex.pokemon_entries.map((entry) => (
        <PokemonCard
          key={entry.entry_number}
          speciesName={entry.pokemon_species.name}
          dexNumber={entry.entry_number}
        />
      ))}
    </div>
  )
}
