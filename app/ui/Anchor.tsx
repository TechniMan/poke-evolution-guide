import type { ReactNode } from 'react'

export default function Anchor({ children, href }: { children: ReactNode, href: string }) {
  return (
    <a
      className='underline text-blue-500 hover:text-blue-700'
      href={href}
    >
      {children}
    </a>
  )
}
