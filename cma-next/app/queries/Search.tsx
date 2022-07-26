import { gql } from '@apollo/client'

const SEARCH = gql`
query Search($arguments: [String]) {
    com_brightspot_tutorial_HelloWorldQuery(where: {predicate: "* matches ?", arguments: $arguments}) {
      items {
        text
        _id
        title
      }
    }
  }
  
`

export default SEARCH;