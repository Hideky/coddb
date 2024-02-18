import { useCallback, useState } from 'react'

type Props = {
  label: string
  customUnit?: string
  value: number
  setValue: (value: number) => void
  highLabelLength?: boolean
}

const CalculatorInput = ({
  label,
  value,
  customUnit,
  setValue,
  highLabelLength = false,
}: Props) => {
  const [strVal, setStrVal] = useState('')

  const convertToInt = (value: string) => {
    const newValue = value && !Number.isNaN(value) ? parseInt(value) : 0
    setStrVal(newValue.toString())
    return newValue
  }
  return (
    <div className="flex mt-2 mb-2">
      <span
        className={
          (highLabelLength ? 'w-20' : 'w-12') +
          ' inline-flex place-content-end items-center px-3 text-sm border border-r-0 rounded-l-md bg-stone-600 text-stone-200 border-stone-600'
        }
      >
        <b>{label}</b>
      </span>
      <input
        type="number"
        min="0"
        value={strVal}
        onChange={(e) => setValue(convertToInt(e.target.value))}
        className={
          'rounded-none border block flex-1 min-w-0 w-full text-sm border-stone-300 p-2.5  bg-stone-700 border-stone-600 placeholder-stone-400 text-white focus:ring-blue-500 focus:border-blue-500' +
          (customUnit ? '' : ' rounded-r-lg')
        }
      />
      {customUnit && (
        <span
          className={`w-10 inline-flex place-content-end items-center px-3 text-sm border border-l-0 rounded-r-md bg-stone-600 text-stone-200 border-stone-600`}
        >
          <b>{customUnit}</b>
        </span>
      )}
    </div>
  )
}

export default CalculatorInput
