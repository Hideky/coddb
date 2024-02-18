export function humanize(value) {
  if (typeof value == 'string') {
    value = parseInt(value)
  }
  if (value >= 1000000000) {
    const val = value / 1000000000
    if (val.toFixed(1).length > 3) return val.toFixed(0) + 'B'
    else return (val % 1 !== 0 ? val.toFixed(1) : val) + 'B'
  }

  if (value >= 1000000) {
    const val = value / 1000000
    if (val.toFixed(1).length > 3) return val.toFixed(0) + 'M'
    else return (val % 1 !== 0 ? val.toFixed(1) : val) + 'M'
  }
  if (value >= 1000) {
    const val = value / 1000
    if (val.toFixed(1).length > 3) return val.toFixed(0) + 'K'
    else return value = (val % 1 !== 0 ? val.toFixed(1) : val) + 'K'
  }

  if (value >= 100) {
    return value.toFixed(0) + ''
  }

  if (value >= 10) {
    return value.toFixed(1) + ''
  }

  if (value >= 1) {
    return value.toFixed(2) + ''
  }

  if (value < 1 && value > 0) {
    return value.toPrecision(3)
  }

  return value + ''
}
