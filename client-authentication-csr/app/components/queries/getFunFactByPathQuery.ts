import { gql } from '@apollo/client'

export default gql`
  query GetFunFactByPath($path: String) {
    FunFact(model: { path: $path }) {
      text
    }
  }
`
