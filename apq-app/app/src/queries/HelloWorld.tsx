import { gql } from '@apollo/client'

const HelloWorld = gql`
  query HelloWorld($path: String = "") {
    HelloWorld(path: $path) {
      title
      text
    }
  }
`

export default HelloWorld
