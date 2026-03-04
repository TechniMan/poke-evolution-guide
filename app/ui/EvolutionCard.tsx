import { EvolutionClient, PokemonClient } from 'pokenode-ts'
import type { ChainLink } from 'pokenode-ts'

function UppifyName(name: string) {
  return `${name[0].toUpperCase()}${name.substring(1)}`
}

export default async function EvolutionCard({ chainId }: { chainId: number }) {
  const evolutionChain = await new EvolutionClient().getEvolutionChainById(chainId)
  const species = evolutionChain.chain.species
  const pokemon = await new PokemonClient().getPokemonByName(species.name)
  const sprite = pokemon.sprites.front_default!
  const speciesName = UppifyName(species.name)
  const evolutions: ChainLink[] = []
  let current = evolutionChain.chain
  while (current.evolves_to.length > 0) {
    evolutions.push(current.evolves_to[0])
    current = current.evolves_to[0]
  }

  return (
    <div
      className='m-4 p-4 rounded-xl bg-slate-700 outline-offset-1 outline-white/10 flex flex-col grow-0 shrink-0'
    >
      <img
        src={sprite}
        width={100}
        height={100}
        className='rounded-xl bg-slate-600'
      />
      <p>
        {speciesName}
      </p>
      {evolutions.map((evolution) => (
        <div
          key={evolution.species.name}
        >
          <p>
            {evolution.evolution_details[0].min_level}
          </p>
          <p>
            {UppifyName(evolution.species.name)}
          </p>
        </div>
      ))}
    </div>
  )
}