const halloweenFirst = [
  'happy',
  'freaky',
  'scary',
  'crazy',
  'hungry',
  'sleepy',
  'boring',
  'funny'
]
const halloweenSecond = [
  'tired',
  'bored',
  'slow',
  'scared',
  'frightened',
  'bemused',
  'rich',
  'poor'
]
const halloweenThird = [
  'pumpkin',
  'skeleton',
  'ghost',
  'monster',
  'cat',
  'bear'
]

function randomString(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

export function halloweenIDGenerator() {
  return `${randomString(halloweenFirst)}-${randomString(
    halloweenSecond
  )}-${randomString(halloweenThird)}`
}
