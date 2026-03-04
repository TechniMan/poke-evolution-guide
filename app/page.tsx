import { EvolutionClient } from 'pokenode-ts'

import EvolutionCard from '@/app/ui/EvolutionCard'

export default async function Home() {
  const pokedexList = []

  const evolutionApi = new EvolutionClient()
  const evolutionChains = await evolutionApi.listEvolutionChains(0, 20)

  return (
    <div>
      <header className='w-full bg-slate-950 text-center'>
        <h1>Poke Evolution Guide</h1>
      </header>

      <div className='w-full bg-slate-950'>
        Filter by Pokedex: todo
        {/* TODO filter by pokedex/game */}
      </div>
      <div className='w-full bg-slate-950'>
        Show/hide completed: todo
        {/* TODO filter completed hidden/shown */}
      </div>

      <main className='w-full bg-slate-900'>
        <div className='flex flex-wrap'>
          {evolutionChains.results.map((chain) => (
            <EvolutionCard
              key={chain.url}
              chainId={parseInt(chain.url.split('/')[6])}
            />
          ))}
        </div>
      </main>

      <footer className='w-full bg-slate-950 text-center'>
        footer
      </footer>
    </div>
  )
}
