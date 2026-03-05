import type { ReactNode } from 'react'

export default function Paragraph({
  children,
  className
}: {
  children: ReactNode,
  className?: string
}) {
  return (
    <p
      className={`pb-4 ${className}`}
    >
      {children}
    </p>
  )
}
