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
        bg-slate-950
        rounded-md
        w-full
        '
    >
      {/* The initialiser button */}
      <div
        className='
          bg-slate-600
          hover:bg-slate-500
          cursor-pointer
          m-auto
          sm:m-0
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
          mt-1
          outline-slate-600
          overflow-y-scroll
          rounded-md
          transition
          transition-discrete
          pokenavwidth
          z-100
          ${isMenuOpen ? 'block' : 'hidden'}
          ${isMenuOpen ? 'outline-1' : 'outline-0'}
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
