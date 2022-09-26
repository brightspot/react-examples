import GET_FOO from './HelloWorldQuery'
import { useQuery } from '@apollo/client'
// import { print } from "graphql/language/printer"
// import { sha256 } from 'crypto-hash'

const HelloWorldContainer = () => {
  const { loading, error, data } = useQuery(GET_FOO, {
    variables: {
      foo: 'mandi',
    },
  })

  // async function getStuff() {
  //   // console.log(JSON.stringify(GET_FOO))
  //   const result = await sha256("query GetFoo($foo: String) {\n  Foo(model: {foo: $foo}) {\n    body\n    foo\n  }\n}")
  //   // console.log(result)
  // }
  // getStuff()

  if (loading) return <div className="hello-world-message">Loading...</div>
  if (error)
    return (
      <div className="hello-world-message">{`Error! ${error.message}`}</div>
    )
  console.log({ data })
  return <div className="hello-world-container">Hello</div>
}

export default HelloWorldContainer
