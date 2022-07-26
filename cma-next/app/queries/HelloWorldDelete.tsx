import { gql } from '@apollo/client'

const HELLO_WORLD_DELETE = gql`
mutation HelloWorldDelete($id: ID!) {
  brightspot_example_HelloWorldDelete(id: $id, permanently: true) {
    _id
    text
    title
  }
}
`

export default HELLO_WORLD_DELETE