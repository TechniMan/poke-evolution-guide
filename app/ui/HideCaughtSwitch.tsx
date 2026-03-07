'use client'

import { useRouter } from 'next/navigation'

export default function HideCaughtSwitch({
  hideCaught
}: {
  hideCaught: boolean
}) {
  const router = useRouter()
  function toggleHideCaught() {
    router.push(`?hideCaught=${!hideCaught}`)
  }

  return (
    <div className='w-full bg-slate-950 rounded-md'>
      <div
        className='bg-slate-600 cursor-pointer rounded-md px-2 py-1 w-fit'
        onClick={toggleHideCaught}
      >
        <label
          className='cursor-pointer'
          id='hide-caught-label'
        >
          Hide caught Pokemon:
        </label>
        &nbsp;
        <input
          aria-labelledby='hide-caught-label'
          className='cursor-pointer'
          checked={hideCaught}
          onChange={toggleHideCaught}
          type='checkbox'
        />
      </div>
    </div>
  )
}
