import Paragraph from '@/app/ui/basic/Paragraph'
import UnorderedList from './ui/basic/UnorderedList'

export default async function HomePage() {
  const featuresList = [
    "Select the Pokedex for the game you're playing",
    'Lists all Pokemon in that Pokedex order',
    'Shows how to evolve into that Pokemon'
  ]
  const plannedList = [
    'Filter by Pokemon name',
    'Show encounters available on each route of the region',
    'List areas that Pokemon can be encountered',
    'List moves learned by that Pokemon by level',
    'Add remaining Pokedexes'
  ]

  return (
    <div className='p-4'>
      <Paragraph>
        Use this website to assist you in completing your Pokedex. Current features:
      </Paragraph>
      <UnorderedList
        items={featuresList}
      />
      <Paragraph>
        To-dos:
      </Paragraph>
      <UnorderedList
        items={plannedList}
      />
    </div>
  )
}
