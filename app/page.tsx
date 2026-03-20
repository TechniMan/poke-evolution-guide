import Paragraph from '@/components/basic/Paragraph'
import UnorderedList from '@/components/basic/UnorderedList'

export default async function HomePage() {
  const featuresList = [
    "Select the Pokedex for the game you're playing",
    'Lists all Pokemon in that Pokedex order',
    'Shows how to evolve into that Pokemon',
    "Tick off Pokemon you've caught",
    'Hide Pokemon marked as caught',
    'Filter by name of species and the species it evolves from',
  ]
  const plannedList = [
    'Show encounters available on each route of the region',
    'List areas that Pokemon can be encountered',
    'List moves learned by that Pokemon by level',
    "Add remaining games' Pokedexes",
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
