import type { Metadata } from 'next'
import '@/globals.css'

import Anchor from '@/components/basic/Anchor'
import type { NavMenuItem } from '@/components/basic/NavMenu'
import NavMenu from '@/components/basic/NavMenu'
import Link from 'next/link'
import { LocationClient } from 'pokenode-ts'
import PrettifyName from './utils/PrettifyName'


export const metadata: Metadata = {
  title: 'Pokemon Evolution Guide',
  description: 'Uncover the mysteries of Pokemon evolution'
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locationClient = new LocationClient()

  // list of pokedexes: https://pokeapi.co/api/v2/pokedex/
  const listNavItems: NavMenuItem[] = [{
    label: 'Red/Green/Blue/Yellow',
    link: '/list/kanto'
  }, {
    label: 'Gold/Silver/Crystal',
    link: '/list/original-johto'
  }, {
    label: 'Ruby/Sapphire/Emerald',
    link: '/list/hoenn'
  }, {
    label: 'Diamond/Pearl',
    link: '/list/original-sinnoh'
  }, {
    label: 'Platinum',
    link: '/list/extended-sinnoh'
  }, {
    label: 'HeartGold/SoulSilver',
    link: '/list/updated-johto'
  }, {
    label: 'OmegaRuby/AlphaSapphire',
    link: '/list/updated-hoenn'
  }, {
    label: "Let's Go, Pikachu/Eevee!",
    link: '/list/letsgo-kanto'
  }, {
    label: 'Legends: Arceus',
    link: '/list/hisui'
  }]
  // list of regions: https://pokeapi.co/api/v2/region/
  const mapNavItems = (await locationClient.listRegions())
    .results
    .map(region => ({
      label: PrettifyName(region.name),
      link: `/map/${region.name}`
    } as NavMenuItem))

  return (
    <html lang='en'>
      <body
        className='antialiased'
      >
        <div className='min-h-dvh h-dvh max-h-dvh grid grid-cols-1 grid-rows-[auto_auto_1fr_auto]'>
          <header className='w-full bg-slate-950 p-2 text-center text-xl'>
            <h1>Pokemon Evolution Guide</h1>
          </header>

          <nav className='
            bg-slate-950
            content-start
            gap-2
            grid
            grid-cols-1
            sm:grid-cols-[auto_auto_auto_1fr]
            grid-rows-[auto_auto_auto]
            sm:grid-rows-1
            items-start
            justify-self-start
            justify-start
            justify-items-start
            p-2
            self-start
            w-full
          '>
            {/* Home page link */}
            <Link
              className='
                bg-slate-900
                hover:bg-slate-800
                duration-50
                m-auto
                px-2
                py-1
                rounded-md
                text-blue-500
                transition
              '
              href='/'
            >
              Home page
            </Link>

            {/* Nav menu for Pokedex lists */}
            <NavMenu
              items={listNavItems}
              menuLabel='Game Pokedex list'
            />
            {/* Nav menu for encounter lists */}
            <NavMenu
              items={mapNavItems}
              menuLabel='Region encounter list'
            />
          </nav>

          <main className='w-full bg-slate-900 overflow-y-scroll'>
            {children}
          </main>

          <footer className='w-full bg-slate-950 p-2 text-center'>
            Made by&nbsp;
            <Anchor href='https://willthomas.dev/'>Will Thomas</Anchor> |&nbsp;
            <Anchor href='https://github.com/techniman/poke-evolution-guide/'>GitHub</Anchor> |
            Using <Anchor href='https://pokeapi.co'>PokeAPI</Anchor> via <Anchor href='https://pokenode-ts.vercel.app/'>pokenode-ts</Anchor>
          </footer>
        </div>
      </body>
    </html>
  )
}
