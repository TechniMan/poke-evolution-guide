'use client'

export default function Anchor({
  children,
  className,
  href
}: {
  children: React.ReactNode,
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
