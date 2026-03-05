import { EvolutionClient, PokemonClient } from 'pokenode-ts'
import type { ChainLink, EvolutionDetail, Pokemon, PokemonSpecies } from 'pokenode-ts'
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
  dexNumber
}: {
  speciesName: string,
  dexNumber: number
}) {
  let pokemon: Pokemon | null = null
  let pokemonSpecies: PokemonSpecies | null = null
  let evolutionDetails: EvolutionDetail[] = []
  let sprite: string | undefined = undefined
  try {
    pokemon = await pokemonClient.getPokemonByName(speciesName)
    sprite = pokemon.sprites.front_default!
    pokemonSpecies = await pokemonClient.getPokemonSpeciesByName(speciesName)
    if (pokemonSpecies.evolves_from_species) {
      const evolutionChain = await evolutionClient.getEvolutionChainById(parseInt(pokemonSpecies.evolution_chain.url.split('/')[6]))
      evolutionDetails = recurseFindEvolutionDetails(speciesName, evolutionChain.chain)!
    }
  } catch (error) {
    console.error(error)
  }

  return (
    <div
      className='p-4 rounded-xl bg-slate-700 outline-offset-1 outline-white/10 flex flex-col grow-0 shrink-0 basis-48'
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
      {pokemonSpecies?.evolves_from_species ?
        <p>
          Evolves from <strong>{pokemonSpecies?.evolves_from_species.name}</strong>
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
