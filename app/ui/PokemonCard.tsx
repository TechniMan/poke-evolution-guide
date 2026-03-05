import { EvolutionClient, PokemonClient } from 'pokenode-ts'
import type { ChainLink, EvolutionDetail, Pokedex, Pokemon, PokemonSpecies } from 'pokenode-ts'

import PokemonCardClient from './PokemonCardClient'

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
  let sprite: string | null = null
  let pokemonSpecies: PokemonSpecies | null = null
  let isEvolution: boolean = false
  let evolvesFromName: string = ''
  let evolutionDetails: EvolutionDetail[] = []
  try {
    pokemon = await pokemonClient.getPokemonByName(speciesName)
    sprite = pokemon.sprites.front_default
    pokemonSpecies = await pokemonClient.getPokemonSpeciesByName(speciesName)
    // if this Pokemon evolves from another Pokemon which is also in the selected Pokedex
    isEvolution = pokemonSpecies.evolves_from_species && pokedex.pokemon_entries.some(entry => entry.pokemon_species.name === pokemonSpecies?.evolves_from_species.name)
    if (isEvolution) {
      evolvesFromName = pokemonSpecies.evolves_from_species.name
      const evolutionChain = await evolutionClient.getEvolutionChainById(parseInt(pokemonSpecies.evolution_chain.url.split('/')[6]))
      evolutionDetails = recurseFindEvolutionDetails(speciesName, evolutionChain.chain)!
    }
  } catch (error) {
    console.error(error)
  }

  return (
    <PokemonCardClient
      sprite={sprite}
      dexNumber={dexNumber}
      speciesName={speciesName}
      isEvolution={isEvolution}
      evolvesFromName={evolvesFromName}
      evolutionDetails={evolutionDetails}
    />
  )
}
