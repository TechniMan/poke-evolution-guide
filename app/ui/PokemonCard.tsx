import { EvolutionClient, PokemonClient } from 'pokenode-ts'
import type { ChainLink, EvolutionDetail } from 'pokenode-ts'
import PrettifyName from '../utils/PrettifyName'

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

function EvolutionInfo(evDetail: EvolutionDetail) {
  let trigger = ''
  let detail = ''
  switch (evDetail.trigger.name) {
    case 'use-item':
      trigger = `Use item`
      const minLvl = evDetail.min_level ? ` at lvl${evDetail.min_level}` : ''
      detail = `${PrettifyName(evDetail.item!.name)}${minLvl}`
      break

    case 'level-up':
      trigger = 'Level up'
      if (evDetail.min_level) {
        detail = `to ${evDetail.min_level}`
      } else if (evDetail.min_happiness) {
        detail = `with happiness ${evDetail.min_happiness}`
      } else {
        detail = '???'
      }
      break

    case 'use-move':
      const move = evDetail.used_move.name
      const count = evDetail.min_move_count
      trigger = `Use '${move}'`
      detail = `${count} times`
      break

    case 'trade':
      trigger = 'Trade'
      break

    default:
      trigger = `${evDetail.trigger.name}`
      break
  }

  return <EvolutionDetailComponent trigger={trigger} detail={detail} />
}

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

export default async function PokemonCard({ speciesName }: { speciesName: string }) {
  const pokemon = await pokemonClient.getPokemonByName(speciesName)
  const pokemonSpecies = await pokemonClient.getPokemonSpeciesByName(speciesName)
  let evolutionDetails: EvolutionDetail[] = []
  if (pokemonSpecies.evolves_from_species) {
    const evolutionChain = await evolutionClient.getEvolutionChainById(parseInt(pokemonSpecies.evolution_chain.url.split('/')[6]))
    evolutionDetails = recurseFindEvolutionDetails(speciesName, evolutionChain.chain)!
  }

  const sprite = pokemon.sprites.front_default!

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
        {pokemon.id} {PrettifyName(speciesName)}
      </p>
      <ul>
        {evolutionDetails ? evolutionDetails.map((evolution, idx) => (
          <li
            key={idx}
          >
            {EvolutionInfo(evolution)}
          </li>
        )) : ''}
      </ul>
    </div>
  )
}
