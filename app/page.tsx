import { EvolutionClient } from 'pokenode-ts'
import Anchor from './ui/Anchor'

import EvolutionCard from '@/app/ui/EvolutionCard'

export default async function Home() {
  const pokedexList = []

  const evolutionApi = new EvolutionClient()
  const evolutionChains = await evolutionApi.listEvolutionChains(0, 78)

  return (
    <div className='min-h-screen h-screen max-h-screen grid grid-cols-1 grid-rows-[auto_auto_auto_1fr_auto]'>
      <header className='w-full bg-slate-950 text-center'>
        <h1>Pokemon Evolution Guide</h1>
      </header>

      <div className='w-full bg-slate-950'>
        Filter by Pokedex: todo
        {/* TODO filter by pokedex/game */}
      </div>
      <div className='w-full bg-slate-950'>
        Show/hide completed: todo
        {/* TODO filter completed hidden/shown */}
      </div>

      <main className='w-full bg-slate-900 overflow-y-scroll'>
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
        Made by&nbsp;
        <Anchor href='https://willthomas.dev/'>Will Thomas</Anchor> |&nbsp;
        <Anchor href='https://github.com/techniman/poke-evolution-guide/'>GitHub</Anchor> |
        Using <Anchor href='https://pokeapi.co'>PokeAPI</Anchor> via <Anchor href='https://pokenode-ts.vercel.app/'>pokenode-ts</Anchor>
      </footer>
    </div>
  )
}
