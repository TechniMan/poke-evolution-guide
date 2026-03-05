import Paragraph from '@/app/ui/basic/Paragraph'

export default async function Home(children: React.ReactNode) {
  return (
    <div className='p-4'>
      <Paragraph>
        When I was young, the only method I knew of to evolve Pokemon was by levelling them up to a certain point. I wanted to complete my Pokedex, so I spent many hours grinding levels to try and get some to evolve, like Graveler&gt;Golem, Kadabra&gt;Alakazam, only to later find out that they had to be traded in order to evolve again. I was as miffed as a 10 year old can be.
      </Paragraph>
      <Paragraph>
        So now I've created this little website to help figure out which Pokemon are safe to level up to get their evolutions, and which require other means (such as trading, or a special item).
      </Paragraph>
      <Paragraph>
        Please ignore any that have evolution instructions that don't make sense for that game, as its predecessor isn't included :sweat_smiling:
      </Paragraph>
      <Paragraph>
        Also, some of the Pokemon cards are a bit broken, which I need to figure out where in the API or the library I'm using is having issues.
      </Paragraph>
      <Paragraph className='font-bold'>
        Use one of the Pokedex links above to get started :)
      </Paragraph>
    </div>
  )
}
