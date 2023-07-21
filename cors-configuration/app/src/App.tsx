import './App.css'
import { useState, useEffect } from 'react'

interface MemoData {
  AllMemos?: {
    memos: {
      message: string
      subject: string
    }[]
  }
}

const CORS_CONFIG_URL = process.env.REACT_APP_CORS_CONFIG_URL ?? ''

const headers = new Headers()
headers.append('Foo', 'Bar')
// Add custom headers here

const graphqlQuery = JSON.stringify({
  query: `query MyQuery {
    AllMemos {
      memos {
        message
        subject
      }
    }
  }`,
})

const requestOptions = {
  method: 'POST',
  headers: headers,
  body: graphqlQuery,
}

const useMemoData = () => {
  const [memoData, setMemoData] = useState<MemoData>()

  useEffect(() => {
    ;(async () => {
      await fetch(CORS_CONFIG_URL, requestOptions)
        .then((response) => response.json())
        .catch((error) => console.log('error', error))
        .then((data) => setMemoData(data.data))
    })()
  }, [])

  return memoData
}

const App = () => {
  const memoData = useMemoData()

  if (!memoData)
    return (
      <div className="App">
        <h1>Loading...</h1>
      </div>
    )

  return (
    <div className="App">
      <h1>CORS Configuration</h1>
      <div className="seperator"></div>
      {memoData?.AllMemos?.memos && memoData.AllMemos.memos.length > 0 ? (
        memoData?.AllMemos?.memos.map((memo, index) => {
          return (
            <div className="memo-card" key={index}>
              <h2>{memo.subject}</h2>
              <p>{memo.message}</p>
            </div>
          )
        })
      ) : (
        <h1>No Memos Published in Brightspot</h1>
      )}
    </div>
  )
}

export default App
