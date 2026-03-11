'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

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

  const currentPath = usePathname()

  function handleNavMenuItemClicked() {
    setIsMenuOpen(false)
  }

  return (
    <div
      className='
        w-full
        bg-slate-950
        rounded-md
      '
    >
      {/* The initialiser button */}
      <div
        className='
          bg-slate-600
          cursor-pointer
          px-2
          py-1
          rounded-md
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
          rounded-md
          transition
          transition-discrete
          w-auto
          sm:w-auto
          z-100
        `}
      >
        {items.map((item, idx) => (
          currentPath === item.link ?
            <span
              className='
                bg-slate-900
                italic
                px-2
                py-1
              '
              key={idx}
            >
              &gt; {item.label}
            </span>
            :
            <Link
              className='
                  bg-slate-900
                  hover:bg-slate-800
                  duration-50
                  px-2
                  py-1
                  text-blue-500
                  transition
                '
              href={item.link}
              key={idx}
              onClick={handleNavMenuItemClicked}
            >
              {item.label}
            </Link>
        ))}
      </div>
    </div>
  )
}
