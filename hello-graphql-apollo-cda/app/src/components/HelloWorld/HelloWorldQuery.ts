import { gql } from '@apollo/client'

const HelloWorld = gql`
  query HelloWorld($id: ID = "") {
    HelloWorld(id: $id) {
      title
      description
    }
  }
`

export default HelloWorld
