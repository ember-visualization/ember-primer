const { abs } = Math

export default function(needle, haystack) {
  let idx = 0
  let size = haystack.length
  let closestIdx = 0
  let closest = haystack[0]
  let current

  while (idx++ < size) {
    current = haystack[idx]
    if (abs(current - needle) < abs(closest - needle)) {
      closest = current
      closestIdx = idx
    }
  }

  return [closest, closestIdx]
}
