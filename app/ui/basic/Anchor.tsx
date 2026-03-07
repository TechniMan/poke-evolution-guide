import type { ReactNode } from 'react'

export default function Anchor({
  children,
  className,
  href
}: {
  children: ReactNode,
  className?: string,
  href: string
}) {
  return (
    <a
      className={`
        text-blue-500
        hover:text-blue-700
        underline
        ${className}
      `}
      href={href}
    >
      {children}
    </a>
  )
}
