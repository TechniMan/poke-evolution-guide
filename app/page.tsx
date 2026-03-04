import { EvolutionClient, GameClient } from 'pokenode-ts'
import type { Pokedex } from 'pokenode-ts'
import Anchor from './ui/Anchor'

import EvolutionCard from '@/app/ui/EvolutionCard'
import PokemonCard from './ui/PokemonCard'

export default async function Home() {
  const pokedexList: Pokedex[] = []
  const gameClient = new GameClient()
  pokedexList.push(await gameClient.getPokedexByName('letsgo-kanto'))

  const pokemonNames = pokedexList[0].pokemon_entries.map(entry => entry.pokemon_species.name)

  // const evolutionApi = new EvolutionClient()
  // limit to first 78 chains while we work with the letsgo-kanto pokedex
  // const evolutionChains = await evolutionApi.listEvolutionChains(0, 78)

  return (
    <div className='min-h-screen h-screen max-h-screen grid grid-cols-1 grid-rows-[auto_auto_auto_1fr_auto]'>
      <header className='w-full bg-slate-950 text-center'>
        <h1>Pokemon Evolution Guide</h1>
      </header>

      <div className='w-full bg-slate-950'>
        (todo) Filter by Pokedex:&nbsp;
        {pokedexList.map((pokedex) => (
          <span key={pokedex.name}>
            {pokedex.name}
          </span>
        ))}
      </div>
      <div className='w-full bg-slate-950'>
        {/* (todo) Show/hide completed: */}
      </div>

      <main className='w-full bg-slate-900 overflow-y-scroll'>
        <div className='flex flex-wrap gap-4 p-4 justify-center'>
          {/* {evolutionChains.results.map((chain) => (
            <EvolutionCard
              key={chain.url}
              chainId={parseInt(chain.url.split('/')[6])}
              pokedex={pokedexList[0]}
            />
          ))} */}
          {pokemonNames.map((pokName) => (
            <PokemonCard
              key={pokName}
              speciesName={pokName}
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
