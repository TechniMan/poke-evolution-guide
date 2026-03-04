import { EvolutionClient, PokemonClient } from 'pokenode-ts'
import type { ChainLink } from 'pokenode-ts'

function UppifyName(name: string) {
  return `${name[0].toUpperCase()}${name.substring(1)}`
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
      detail = `${det.item?.name}`
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
        width={96}
        height={96}
        className='rounded-xl bg-slate-600 mx-auto'
      />
      <p>
        {speciesName}
      </p>
      {evolutions.map((evolution) => (
        <div
          key={evolution.species.name}
        >
          {EvolutionInfo(evolution)}
          <p>
            {UppifyName(evolution.species.name)}
          </p>
        </div>
      ))}
    </div>
  )
}
