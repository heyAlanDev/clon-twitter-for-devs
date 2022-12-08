import { useEffect, useState } from 'react'

const DATE_UNITS = [
  ['day', 86400],
  ['hour', 3600],
  ['minute', 60],
  ['second', 1]
]

const getDateDiffs = timestamp => {
  const now = Date.now()
  const elapsed = (timestamp - now) / 1000

  for (const [unit, secondInUnit] of DATE_UNITS) {
    if (Math.abs(elapsed) > secondInUnit || unit === 'second') {
      const value = Math.round(elapsed / secondInUnit)
      return { value, unit }
    }
  }
}

export default function useTimeAgo (timestamp) {
  const [timeAgo, setTimeAgo] = useState(() => getDateDiffs(timestamp))

  useEffect(() => {
    const timeout = setInterval(() => {
      const newTimeAgo = getDateDiffs(timestamp)
      setTimeAgo(newTimeAgo)
    }, 5000)
    return () => clearInterval(timeout)
  }, [timestamp < 3600])

  const rtf = new Intl.RelativeTimeFormat(navigator.language, {
    style: 'short'
  })

  const { value, unit } = timeAgo

  return rtf.format(value, unit)
}
