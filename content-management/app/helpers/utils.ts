import { Dispatch, SetStateAction } from 'react'

// refer to Stack Overflow response: https://stackoverflow.com/questions/71193818/react-onclick-argument-of-type-eventtarget-is-not-assignable-to-parameter-of-t
function assertIsNode(e: EventTarget | null): asserts e is Node {
  if (!e || !('nodeType' in e)) {
    throw new Error(`Node expected`)
  }
}

function runErrorWithTimeout(
  errorState: string | null,
  setErrorState: Dispatch<SetStateAction<string | null>>,
  milliseconds: number
) {
  if (errorState) {
    const timeId = setTimeout(() => {
      setErrorState(null)
    }, milliseconds)
    return () => {
      clearTimeout(timeId)
    }
  }
}

function convertTimestamp(seconds: number | null | undefined) {
  if (seconds) {
    const t = new Date(seconds)
    return t.toLocaleDateString('en-us', {
      year: '2-digit',
      month: '2-digit',
      day: 'numeric',
      weekday: 'short',
      hour: 'numeric',
      minute: 'numeric',
    })
  }
}

// Refer to Stack Overflow response: https://stackoverflow.com/questions/586182/how-to-insert-an-item-into-an-array-at-a-specific-index-javascript
const insertItem = (arr: any[], index: number, newItem: any) => [
  ...arr.slice(0, index),
  newItem,
  ...arr.slice(index),
]

export { runErrorWithTimeout, convertTimestamp, insertItem, assertIsNode }
