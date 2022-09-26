import { gql } from '@apollo/client'

const GET_FOO = gql`
  query GetFoo($foo: String) {
    Foo(model: { foo: $foo }) {
      body
      foo
    }
  }
`

export default GET_FOO
