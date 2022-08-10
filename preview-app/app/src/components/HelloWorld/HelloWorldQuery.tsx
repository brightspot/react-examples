import { gql } from '@apollo/client'

const HelloWorld = gql`
  query HelloWorld($id: ID, $path: String) {
    HelloWorld(id: $id, path: $path) {
      title
      text
    }
  }
`

export default HelloWorld
