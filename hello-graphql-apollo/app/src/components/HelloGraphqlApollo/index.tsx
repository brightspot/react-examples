import { useState } from 'react'
import { gql, useQuery } from '@apollo/client'

const HelloQuery = gql`
  query HelloGraphqlApollo($id: ID) {
    HelloGraphqlApollo(id: $id) {
      name
      message
    }
  }
`

// type HelloData = {
//   name?: string
//   message?: string
// }

// type HelloResponse = {
//   helloData?: HelloData
//   errors?: string[]
// }

const HelloGraphqlApollo = () => {
  // const [helloResponse, setHelloResponse] = useState<HelloResponse>()
  const [input, setInput] = useState<string>('brightspot')

  const { data, error } = useQuery(HelloQuery, {
    variables: { id: input },
  })

  console.log(data, error)

  return (
    <div className="container">
      <div className="input-wrapper">
        <label htmlFor="id-url">Enter Name:</label>
        <input
          required
          name="id-url"
          onChange={(e) => {
            e.preventDefault()
            setInput(e.target.value)
            // fetchAndSetContent(e.target.value)
          }}
        />
      </div>
      <div className="content-container">
        {/* <h1 className="content-text">Hello {helloResponse?.helloData?.name}</h1>
        <h3 className="content-text">{helloResponse?.helloData?.message}</h3> */}
      </div>
      {/* {error.map((error, i) => {
        return (
          <p className="error" key={i}>
            {error}
          </p>
        )
      })} */}
    </div>
  )
}

export default HelloGraphqlApollo
