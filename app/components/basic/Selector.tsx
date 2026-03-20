'use client'

import type { ChangeEvent } from 'react'

export type SelectorOption = {
  label: string
  value: string
}

export default function Selector({
  label,
  options,
  setSelection,
  initialSelectedValue
}: {
  label: string,
  options: SelectorOption[],
  setSelection: (newValue: string) => void,
  initialSelectedValue?: string
}) {
  const id = `${label.toLowerCase().replaceAll(' ', '-')}-selector`

  function handleSelection(e: ChangeEvent<HTMLSelectElement, HTMLSelectElement>) {
    setSelection(e.target.value)
  }

  return (
    <div
      className='my-2'
    >
      <label
        className='mr-2'
        htmlFor={id}
      >
        {label}
      </label>

      <select
        className='bg-slate-800 p-2 rounded-md'
        id={id}
        onChange={handleSelection}
      >
        {options.map((option, idx) => (
          <option
            key={idx}
            value={option.value}
            selected={option.value === initialSelectedValue}
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}
