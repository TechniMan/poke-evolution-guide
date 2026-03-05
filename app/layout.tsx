import type { Metadata } from 'next'
import './globals.css'

import Anchor from '@/app/ui/basic/Anchor'

type PokedexLink = {
  name: string
  label: string
}

export const metadata: Metadata = {
  title: 'Pokemon Evolution Guide',
  description: 'Uncover the mysteries of Pokemon evolution'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pokedexList: PokedexLink[] = [{
    name: 'kanto',
    label: 'FireRed/LeafGreen'
  }, {
    name: 'hoenn',
    label: 'Ruby/Sapphire/Emerald'
  }, {
    name: 'letsgo-kanto',
    label: "Let's Go Pikachu/Eevee"
  }, {
    name: 'hisui',
    label: 'Legends: Arceus'
  }]

  return (
    <html lang='en'>
      <body
        className='antialiased'
      >
        <div className='min-h-dvh h-dvh max-h-dvh grid grid-cols-1 grid-rows-[auto_auto_1fr_auto]'>
          <header className='w-full bg-slate-950 p-2 text-center text-xl'>
            <h1>Pokemon Evolution Guide</h1>
          </header>

          <nav className='w-full bg-slate-950 p-2'>
            <Anchor href='/'>Home</Anchor>
            {pokedexList.map((pokedex) => (
              <span key={pokedex.name}>
                &nbsp;| <Anchor href={`/list/${pokedex.name}/`}>
                  {pokedex.label}
                </Anchor>
              </span>
            ))}
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
