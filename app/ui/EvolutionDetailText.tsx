'use client'

import type { EvolutionDetail } from 'pokenode-ts'
import PrettifyName from '../utils/PrettifyName'

function EvolutionInfo(evDetail: EvolutionDetail): {
  trigger: string,
  detail: string
} {
  let trigger = ''
  let detail = ''
  switch (evDetail.trigger.name) {
    case 'use-item':
      trigger = `Use Item`
      const minLvl = evDetail.min_level ? ` at lvl${evDetail.min_level}` : ''
      detail = `${PrettifyName(evDetail.item!.name)}${minLvl}`
      break

    case 'level-up':
      trigger = 'Level Up'
      if (evDetail.min_level) {
        detail = `to ${evDetail.min_level}`
      } else if (evDetail.min_happiness) {
        detail = `with happiness ${evDetail.min_happiness}`
      } else if (evDetail.min_beauty) {
        detail = `with min beauty ${evDetail.min_beauty}`
      } else {
        detail = '???'
      }
      break

    case 'trade':
      trigger = 'Trade'
      if (evDetail.held_item) {
        detail = `holding a ${PrettifyName(evDetail.held_item.name)}`
      }
      break

    // TODO: PR newer PokeAPI features into pokenode-ts
    // case 'use-move':
    //   const move = evDetail.used_move.name
    //   const count = evDetail.min_move_count
    //   trigger = `Use '${move}'`
    //   detail = `${count} times`
    //   break

    default:
      trigger = PrettifyName(evDetail.trigger.name)
      break
  }

  return { trigger, detail }
}

export default function EvolutionDetailText({ evolutionDetail }: { evolutionDetail: EvolutionDetail }) {
  const { trigger, detail } = EvolutionInfo(evolutionDetail)

  return (
    <p>
      {trigger == 'Level Up' ?
        <span className='text-lime-500'>{trigger}</span> :
        <span className='text-amber-500'>{trigger}</span>}
      &nbsp;
      <span>
        {detail}
      </span>
    </p>
  )
}
