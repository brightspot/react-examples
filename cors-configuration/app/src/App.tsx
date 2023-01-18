import './App.css'
import { useState, useEffect } from 'react'

interface MemoData {
  AllMemos:
    | {
        memos: {
          message: string
          subject: string
        }[]
      }
    | undefined
}

const App = () => {
  const [memoData, setMemoData] = useState<MemoData>()

  useEffect(() => {
    const myHeaders = new Headers()
    myHeaders.append('Foo', 'Bar')
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
      headers: myHeaders,
      body: graphqlQuery,
    }

    const dataFetch = async () => {
      const data = await fetch(
        'http://localhost/graphql/delivery/cors-configuration',
        requestOptions
      )
        .then((response) => response.json())
        .catch((error) => console.log('error', error))

      setMemoData(data.data)
    }

    dataFetch()
  }, [])

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
      {memoData?.AllMemos?.memos.map((memo, index) => {
        return (
          <div className="memo-card" key={index}>
            <h2>{memo.subject}</h2>
            <p>{memo.message}</p>
          </div>
        )
      })}
    </div>
  )
}

export default App
