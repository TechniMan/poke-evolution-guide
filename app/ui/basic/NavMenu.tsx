'use client'

import { useState } from 'react'

import Anchor from '@/app/ui/basic/Anchor'

export type NavMenuItem = {
  label: string,
  link: string
}

export default function NavMenu({
  items,
  menuLabel
}: {
  items: NavMenuItem[],
  menuLabel: string
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  function handleClickMenu() {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <div className='w-full bg-slate-950 rounded-sm'>
      {/* The initialiser button */}
      <div
        className='
          bg-slate-600
          cursor-pointer
          px-2
          py-1
          rounded-sm
          w-fit
        '
        onClick={handleClickMenu}
      >
        {menuLabel}
      </div>

      {/* The menu */}
      <div
        className={`
          absolute
          bg-slate-900
          flex
          flex-col
          gap-1
          ${isMenuOpen ? 'block' : 'hidden'}
          ${isMenuOpen ? 'outline-1' : 'outline-0'}
          outline-slate-600
          overflow-hidden
          rounded-sm
          transition
          transition-discrete
          w-auto
          sm:w-auto
          z-100
        `}
      >
        {items.map((item, idx) => (
          <Anchor
            className='
              bg-slate-900
              hover:bg-slate-700
              duration-50
              px-2
              py-1
              rounded-sm
              transition
            '
            href={item.link}
            key={idx}
          >
            {item.label}
          </Anchor>
        ))}
      </div>
    </div>
  )
}
