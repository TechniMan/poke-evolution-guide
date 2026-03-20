'use client'

export default function UnorderedList({
  items
}: {
  items: string[]
}) {
  return (
    <ul
      className='flex flex-col pb-4'
    >
      {items.map((item, idx) => (
        <li
          className='ml-4'
          key={idx}
        >
          &gt;
          <span
            className='ml-4'
          >
            {item}
          </span>
        </li>
      ))}
    </ul>
  )
}