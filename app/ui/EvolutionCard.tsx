import { EvolutionClient, PokemonClient } from 'pokenode-ts'
import type { ChainLink, Pokedex } from 'pokenode-ts'

function CapitaliseWord(word: string): string {
  return `${word[0].toUpperCase()}${word.substring(1)}`
}
function PrettifyName(name: string): string {
  return name.split('-').reduce((acc, val) => `${acc}${CapitaliseWord(val)} `, '')
}

function EvolutionDetailComponent({ trigger, detail }: { trigger: string, detail: string }) {
  return (
    <p>
      {trigger == 'Level up' ?
        <span className='text-lime-500'>{trigger}</span> :
        <span className='text-amber-500'>{trigger}</span>}
      &nbsp;
      <span>
        {detail}
      </span>
    </p>
  )
}

function EvolutionInfo(evolution: ChainLink) {
  const det = evolution.evolution_details[0]
  let trigger = ''
  let detail = ''
  switch (det.trigger.name) {
    case 'use-item':
      trigger = `Use item`
      const minLvl = det.min_level ? ` at lvl${det.min_level}` : ''
      detail = `${PrettifyName(det.item!.name)}${minLvl}`
      break

    case 'level-up':
      trigger = 'Level up'
      if (det.min_level) {
        detail = `to ${det.min_level}`
      } else if (det.min_happiness) {
        detail = `with happiness ${det.min_happiness}`
      } else {
        detail = '???'
      }
      break

    case 'use-move':
      const move = det.used_move.name
      const count = det.min_move_count
      trigger = `Use '${move}'`
      detail = `${count} times`
      break

    case 'trade':
      trigger = 'Trade'
      break

    default:
      trigger = `${det.trigger.name}`
      break
  }

  return <EvolutionDetailComponent trigger={trigger} detail={detail} />
}

export default async function EvolutionCard({ chainId, pokedex }: { chainId: number, pokedex: Pokedex }) {
  // get the evolution chain data
  const evolutionChain = await new EvolutionClient().getEvolutionChainById(chainId)
  // determine the first stage that exists for this pokedex
  let species = evolutionChain.chain.species
  let current = evolutionChain.chain
  // if the initial stage for the chain isn't in the pokedex, then set it to the next stage instead
  if (!pokedex.pokemon_entries.some((entry) => entry.pokemon_species.name === species.name)) {
    current = evolutionChain.chain.evolves_to[0]
    species = evolutionChain.chain.evolves_to[0].species
  }
  // find the evolutions that exist for this pokedex
  const evolutions: ChainLink[] = []
  while (current.evolves_to.length > 0) {
    if (pokedex.pokemon_entries.some((entry) => entry.pokemon_species.name === current.evolves_to[0].species.name)) {
      evolutions.push(current.evolves_to[0])
    }
    current = current.evolves_to[0]
  }

  // bonus data, for display
  const pokemon = await new PokemonClient().getPokemonByName(species.name)
  const sprite = pokemon.sprites.front_default!
  const speciesName = PrettifyName(species.name)

  return (
    <div
      className='p-4 rounded-xl bg-slate-700 outline-offset-1 outline-white/10 flex flex-col grow-0 shrink-0 basis-48'
    >
      <img
        src={sprite}
        width={96}
        height={96}
        className='rounded-xl bg-slate-600 mx-auto'
      />
      <p>
        {chainId} {speciesName}
      </p>
      {evolutions.map((evolution) => (
        <div
          key={evolution.species.name}
        >
          {EvolutionInfo(evolution)}
          <p className='text-center'>&#x2B9F;</p>
          <p>
            {PrettifyName(evolution.species.name)}
          </p>
        </div>
      ))}
    </div>
  )
}
