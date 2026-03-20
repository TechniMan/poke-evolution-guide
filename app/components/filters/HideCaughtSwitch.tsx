'use client'

export default function HideCaughtSwitch({
  hideCaught,
  setHideCaught
}: {
  hideCaught: boolean,
  setHideCaught: Function
}) {
  function toggleHideCaught() {
    setHideCaught(!hideCaught)
  }

  return (
    <div
      className='bg-slate-600 hover:bg-slate-500 cursor-pointer rounded-md px-2 py-1 w-fit'
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
  )
}
