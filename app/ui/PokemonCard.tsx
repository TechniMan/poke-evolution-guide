import { EvolutionClient, PokemonClient } from 'pokenode-ts'
import type { ChainLink, EvolutionDetail, Pokedex, Pokemon, PokemonSpecies } from 'pokenode-ts'
import PrettifyName from '../utils/PrettifyName'
import EvolutionDetailText from './EvolutionDetailText'

const evolutionClient = new EvolutionClient()
const pokemonClient = new PokemonClient()

function recurseFindEvolutionDetails(speciesName: string, chainLink: ChainLink): EvolutionDetail[] | null {
  // is this chainLink the chainLink we're looking for?
  if (chainLink.species.name === speciesName) {
    //TODO account for multiple evolution methods
    return chainLink.evolution_details
  }

  // else, look into all of its children chainLinks
  for (const evolvesTo of chainLink.evolves_to) {
    const result = recurseFindEvolutionDetails(speciesName, evolvesTo)
    if (result !== null) {
      return result
    }
  }
  return null
}

export default async function PokemonCard({
  speciesName,
  dexNumber,
  pokedex
}: {
  speciesName: string,
  dexNumber: number,
  pokedex: Pokedex
}) {
  let pokemon: Pokemon | null = null
  let pokemonSpecies: PokemonSpecies | null = null
  let evolutionDetails: EvolutionDetail[] = []
  let sprite: string | undefined = undefined
  let isEvolution: boolean = false
  try {
    pokemon = await pokemonClient.getPokemonByName(speciesName)
    sprite = pokemon.sprites.front_default!
    pokemonSpecies = await pokemonClient.getPokemonSpeciesByName(speciesName)
    // if this Pokemon evolves from another Pokemon which is also in the selected Pokedex
    isEvolution = pokemonSpecies.evolves_from_species && pokedex.pokemon_entries.some(entry => entry.pokemon_species.name === pokemonSpecies?.evolves_from_species.name)
    if (isEvolution) {
      const evolutionChain = await evolutionClient.getEvolutionChainById(parseInt(pokemonSpecies.evolution_chain.url.split('/')[6]))
      evolutionDetails = recurseFindEvolutionDetails(speciesName, evolutionChain.chain)!
    }
  } catch (error) {
    console.error(error)
  }

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
          Evolves from <strong>{PrettifyName(pokemonSpecies!.evolves_from_species.name)}</strong>
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
