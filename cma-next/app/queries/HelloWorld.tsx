import { gql } from '@apollo/client'

const HELLO_WORLD = gql`
query HelloWorld {
  brightspot_example_HelloWorldQuery {
    items {
      _id
      text
      title
    }
  }
} 
`

export default HELLO_WORLD;