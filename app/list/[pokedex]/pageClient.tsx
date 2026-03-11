'use client'

import { useState } from 'react'
import HideCaughtSwitch from '@/app/ui/HideCaughtSwitch'
import { HideCaughtContext } from '@/app/contexts/HideCaughtContext'

export default function PokemonListPageClient({
  children
}: {
  children: React.ReactNode
}) {
  const [hideCaught, setHideCaught] = useState(false)

  return (
    <div className='flex flex-wrap gap-4 sm:gap-6 p-4 justify-center'>
      <div className='w-full bg-slate-950 rounded-md'>
        <HideCaughtSwitch
          hideCaught={hideCaught}
          setHideCaught={setHideCaught}
        />
      </div>

      <HideCaughtContext value={hideCaught}>
        {children}
      </HideCaughtContext>
    </div >
  )
}