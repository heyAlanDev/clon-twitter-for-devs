import { useEffect, useState } from 'react'
export const DEFAULT_LANGUAGE = 'es-ES'

const DATE_UNITS_SEG = [
  ['day', 86400],
  ['hour', 3600],
  ['minute', 60],
  ['second', 1]
]

export const getDateTimeFormat = (timestamp, options = undefined) => {
  const date = new Date(timestamp)
  const language = DEFAULT_LANGUAGE

  return new Intl.DateTimeFormat(language, options).format(date)
}

const getDateDiffs = timestamp => {
  const now = Date.now()
  const elapsed = (timestamp - now) / 1000

  for (const [unit, secondInUnit] of DATE_UNITS_SEG) {
    if (Math.abs(elapsed) > secondInUnit || unit === 'second') {
      const value = Math.round(elapsed / secondInUnit)
      return { value, unit }
    }
  }
}

export default function useTimeAgo (timestamp) {
  const [timeAgo, setTimeAgo] = useState(() => getDateDiffs(timestamp))

  useEffect(() => {
    const { unit } = timeAgo

    if (unit === 'second' || unit === 'minute') {
      const timeout = setInterval(
        () => {
          const newTimeAgo = getDateDiffs(timestamp)
          setTimeAgo(newTimeAgo)
        },
        unit === 'second' ? 1000 : 60000
      )
      return () => clearInterval(timeout)
    }
  }, [timestamp])
  // FIXME: fix the months with < 30 || < 29 || < 28
  const { value, unit } = timeAgo
  if (value < -31 && unit === 'day') {
    return getDateTimeFormat(timestamp)
  }

  const rtf = new Intl.RelativeTimeFormat(DEFAULT_LANGUAGE, {
    style: 'short'
  })

  return rtf.format(value, unit)
}
