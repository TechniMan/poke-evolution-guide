export default function Paragraph({
  children,
  className
}: {
  children: React.ReactNode,
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
