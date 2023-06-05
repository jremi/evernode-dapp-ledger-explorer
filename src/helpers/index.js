export const formatTimestamp = (timestamp) => {
  const date = new Date(timestamp)
  const formattedTime = date.toLocaleTimeString([], {
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  })
  return formattedTime
}

export const getHashPrefix = (hash) => {
  return hash.slice(0, 6)
}
