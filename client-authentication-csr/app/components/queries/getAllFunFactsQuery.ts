import { gql } from '@apollo/client'

export default gql`
  query GetAllFunFactsQuery {
    AllFunFacts {
      funFacts {
        text
        path
      }
    }
  }
`
