import { gql } from '@apollo/client'

const SEARCH = gql`
query Search($arguments: [String]) {
    brightspot_example_HelloWorldQuery(where: {predicate: "* matches ?", arguments: $arguments}) {
      items {
        text
        _id
        title
      }
    }
  }
  
`

export default SEARCH;