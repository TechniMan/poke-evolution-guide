'use client'

import { ChangeEvent } from "react"

export default function NameFilterInput({
  nameFilter,
  setNameFilter
}: {
  nameFilter: string,
  setNameFilter: Function
}) {
  function handleInput(event: ChangeEvent<HTMLInputElement, HTMLInputElement>) {
    setNameFilter(event.target.value)
  }
  function selectInput() {
    document.getElementById('name-filter-input')?.focus()
  }

  return (
    <div
      className='bg-slate-600 hover:bg-slate-500 cursor-pointer rounded-md px-2 py-1 w-fit'
      onClick={selectInput}
    >
      <label
        className='cursor-pointer'
        id='name-filter-label'
      >
        Filter by name/item:
      </label>
      &nbsp;
      <input
        aria-labelledby='name-filter-label'
        className='cursor-pointer'
        id='name-filter-input'
        onChange={handleInput}
        placeholder='filter by name...'
        type='text'
        value={nameFilter}
      />
    </div>
  )
}
