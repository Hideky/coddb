import { useCallback, useState } from 'react'

type Props = {
  label: string
  value: number
  setValue: (value: number) => void
  totalValue: number
  sharedRatio?: number
  highLabelLength?: boolean
}

const CalculatorSlider = ({
  label,
  value,
  totalValue,
  sharedRatio,
  setValue,
  highLabelLength = false,
}: Props) => {
  const convertToInt = (value: string) => {
    const newValue = value && !Number.isNaN(value) ? parseInt(value) : 0
    return newValue
  }
  return (
    <div className="flex mt-2 mb-2">
      <span
        className={
          (highLabelLength ? 'w-20' : 'w-12') +
          ' inline-flex place-content-end items-center px-3 text-sm text-stone-200'
        }
      >
        <b>{label}</b>
      </span>
      <input
        type="range"
        min="0"
        max="100"
        value={value}
        onChange={(e) => setValue(Math.min(convertToInt(e.target.value), 100 - sharedRatio))}
        className={
          'block flex-1 min-w-0 w-full text-sm border-stone-300  bg-stone-700 border-stone-600 text-white focus:ring-blue-500 focus:border-blue-500'
        }
      />
      <span className="w-[4.5rem] inline-flex place-content-end items-center px-3 text-sm border rounded-md bg-stone-600 text-stone-200 border-stone-600 ml-2">
        <b>{value} %</b>
      </span>
      <span className="w-[5rem] inline-flex place-content-end items-center px-3 text-sm border rounded-md bg-stone-600 text-stone-200 border-stone-600 ml-2">
        <b>{Math.round((totalValue / 100) * value).toLocaleString()}</b>
      </span>
    </div>
  )
}

export default CalculatorSlider
